import logging
from typing import Iterable, List, Optional, Tuple, Union
from cachetools import cached
import marisa_trie
from rapidfuzz import fuzz, process, utils
from .model.model import Item, ItemTypeEnum, Topic, Id
from .model.content_access import find_spaces, find_topics, find_items, get_space

log = logging.getLogger(__name__)


def _normalize(text: str):
    # Lowercase and trim.
    return str(utils.default_process(text))


# TODO: For now we're skipping answer item types since they are usually covered by questions.
# TODO: Consider indexing other fields, e.g. URL domain and if we make title optional on notes.
ALLOWED_ITEM_TYPES = [
    ItemTypeEnum.note.value,
    ItemTypeEnum.question.value,
    ItemTypeEnum.resource.value,
]


def text_for(item) -> Optional[str]:
    if isinstance(item, Topic):
        return item.name
    elif isinstance(item, Item):
        if item.item_type in ALLOWED_ITEM_TYPES:
            return item.title_text
        else:
            return None
    else:
        raise ValueError(f"Unknown item type: {item}")


# Could experiment with this more.
# https://maxbachmann.github.io/RapidFuzz/Usage/fuzz.html
def scorer(query, text, **_kwargs):
    return (
        0.4 * fuzz.token_set_ratio(query, text)
        + 0.4 * fuzz.partial_ratio(query, text)
        + 0.2 * fuzz.token_sort_ratio(query, text)
        - 0.1 * len(text)  # Good to put short matches (like topics) first.
    )


# Another idea would be to use a looser scoring (depending on the number of words).
# num_query_words = len(query.split())
# def scorer_loose(query, text, stopwords=STOPWORDS_EN, **_kwargs):
#     query_tokens = set(query.split()) - stopwords
#     score = sum([fuzz.partial_ratio(token, text) for token in query_tokens])
#     return score


class AutoCompleteIndex:
    def __init__(self, topics: Iterable[Topic], items: Iterable[Item], name=None):
        self.name = name
        self.topics = dict()
        self.items = dict()
        self.data = None
        self.texts = None
        self.trie = None
        self.update(topics, items, [])

    def update(
        self, topics: Iterable[Topic], items: Iterable[Item], tombstones: Iterable[Id]
    ) -> None:
        self.topics.update([(t.id, t) for t in topics])
        self.items.update([(i.id, i) for i in items])

        for iid in tombstones:
            self.topics.pop(iid, None)
            self.items.pop(iid, None)

        self.reindex()

        log.info(
            f"%s updated",
            self,
        )

    def reindex(self) -> None:
        # Combine all data and record indices into this array so we can get
        # the original data back out of the trie.
        full_data = list(self.topics.values()) + list(self.items.values())
        self.data = []
        self.texts = []
        for item in full_data:
            text = text_for(item)
            if text:
                self.data.append(item)
                self.texts.append(_normalize(text))
        log.info("Reindexing %s items with text (out of %s total)", len(self.data), len(full_data))

        records = [(i,) for i in range(len(self.data))]
        trie_format = "<I"  # Unsigned integer to store the index.
        self.trie = marisa_trie.RecordTrie(trie_format, zip(self.texts, records))

    def _find_prefix_matches(self, query: str, max_results: int, score_cutoff: int):
        assert self.trie and self.data

        prefix_matches = self.trie.items(query)
        # log.info("Prefix matches: %s", prefix_matches)
        scored_results = [(index, scorer(query, text)) for text, (index,) in prefix_matches]
        ranked_results = sorted(
            scored_results,
            key=lambda x: x[1],
            reverse=True,
        )
        return [
            (self.data[index], score)
            for index, score in ranked_results[:max_results]
            if score > score_cutoff
        ]

    def _find_substring_matches(self, query: str, max_results: int, score_cutoff: int):
        assert self.texts and self.data

        ranked_results = process.extract(query, self.texts, limit=max_results, scorer=scorer)
        # log.info("Substring matches: %s", ranked_results)
        return [
            (self.data[index], score)
            for _text, score, index in ranked_results
            if score > score_cutoff
        ]

    def search(
        self,
        query,
        max_results,
        prefix_threshold=3,
        rare_threshold=5,
        score_cutoff=50,
        min_results_target=8,
    ):
        """Hybrid that tries to do prefix or substring depending on query length and rarity."""

        if not self.texts or not self.data or not self.trie:
            raise ValueError("Not initialized")

        query = _normalize(query)

        # Count items with the same prefix.
        num_prefix_matches = len(self.trie.keys(query))

        # log.info("Found %s prefix matches for '%s'", num_prefix_matches, query)

        # First try prefix matching for short queries that are not rare.
        if len(query) <= prefix_threshold and num_prefix_matches >= rare_threshold:
            prefix_matches = self._find_prefix_matches(query, max_results, score_cutoff)
            if len(prefix_matches) >= min_results_target:
                return prefix_matches
        # Use substring matching for longer queries or rare short queries.
        substring_matches = self._find_substring_matches(query, max_results, score_cutoff)
        return substring_matches

    def __repr__(self):
        return f"AutoCompleteIndex({self.name}, {len(self.topics)} topics, {len(self.items)} items)"


_indices = None


def load_autocomplete_indices() -> None:
    spaces = find_spaces()
    global _indices
    _indices = {
        str(space.id): AutoCompleteIndex(
            find_topics(space.id),
            find_items(space.id),
            name=space.slug,
        )
        for space in spaces
    }


def update_autocomplete_index(space_id: Id, topics, items, tombstones: Iterable[Id]) -> None:
    if not _indices:
        raise ValueError("Not initialized")

    _indices[str(space_id)].update(topics, items, tombstones)


@cached(cache={})
def _warn_once(space_id: Id):
    space_slug = get_space(space_id).slug
    log.warn("No index for space_id %s (%s)", space_id, space_slug)


def search_autocomplete(space_id: Id, query: str, max_results: int) -> List[Tuple[Item, float]]:
    if not _indices:
        raise ValueError("Not initialized")

    if str(space_id) in _indices:
        return _indices[str(space_id)].search(query, max_results)
    else:
        _warn_once(space_id)
        return []
