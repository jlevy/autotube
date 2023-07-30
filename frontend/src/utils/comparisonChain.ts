export type Selector<T, K> = (item: T) => K;
export type Comparator<T> = (a: T, b: T) => number;

const nullLastCompare: Comparator<any | null> = (a, b) => {
  if (a === null) return b === null ? 0 : 1;
  if (b === null) return -1;
  return defaultCompare(a, b);
};

const nullFirstCompare: Comparator<any | null> = (a, b) => {
  if (a === null) return b === null ? 0 : -1;
  if (b === null) return 1;
  return defaultCompare(a, b);
};

const defaultCompare: Comparator<any> = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * A Google Guava-style comparison chain to make complex sorting, such as secondary
 * sorts, significantly easier.
 *
 * For example:
 *
 * items.sort(comparisonChain<Item>()
 *   .compare(item => item.title, ordering.nullsLast)
 *   .compare(item => item.url)
 *   .result());
 */
export const comparisonChain = <T>() => {
  let compare: Comparator<T> = (a, b) => 0;

  const chain: {
    compare: <K>(selector: Selector<T, K>, comparator?: Comparator<K>) => typeof chain;
    result: () => Comparator<T>;
  } = {
    compare: <K>(selector: Selector<T, K>, comparator: Comparator<K> = defaultCompare) => {
      const prevCompare = compare;
      compare = (a, b) => prevCompare(a, b) || comparator(selector(a), selector(b));
      return chain;
    },
    result: () => compare,
  };

  return chain;
};

export const reverse =
  <T>(comparator: Comparator<T>) =>
  (a: T, b: T) =>
    comparator(b, a);

// Manually specified comparison order.
const manualOrderComparator = <T>(order: ReadonlyArray<T>): Comparator<T> => {
  // Create a map from value to index in the order array.
  const orderMap = new Map(order.map((value, index) => [value, index]));

  // Return a comparator that uses the index in the order array.
  return (a: T, b: T): number => {
    const indexA = orderMap.get(a);
    const indexB = orderMap.get(b);

    // If a value is not in the manually ordered array, put it at the end.
    if (indexA === undefined) return indexB === undefined ? 0 : 1;
    if (indexB === undefined) return -1;

    return indexA - indexB;
  };
};

export const ordering = {
  // Simple for now, but could make the ordering interface fluent like Guava as well,
  // to allow reversing combined with nulls last, etc.
  nullsLast: nullLastCompare,
  nullsFirst: nullFirstCompare,
  default: defaultCompare,
  reversed: reverse(defaultCompare),

  manual: manualOrderComparator,
};
