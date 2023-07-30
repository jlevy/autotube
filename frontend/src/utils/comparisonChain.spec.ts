import { comparisonChain, ordering } from './comparisonChain';

interface Item {
  title: string | null;
  url: string | null;
  sequenceNum: number | null;
}

// Setup a sample data
const items: Item[] = [
  { title: 'D', url: 'd.com', sequenceNum: null },
  { title: 'B', url: 'c.com', sequenceNum: 1 },
  { title: 'A', url: 'b.com', sequenceNum: 2 },
  { title: null, url: 'b.com', sequenceNum: 3 },
  { title: 'C', url: 'd.com', sequenceNum: 4 },
  { title: 'A', url: null, sequenceNum: 5 },
  { title: 'B', url: 'a.com', sequenceNum: 6 },
  { title: 'A', url: null, sequenceNum: 7 },
  { title: null, url: 'd.com', sequenceNum: 8 },
  { title: 'C', url: 'd.com', sequenceNum: 9 },
  { title: 'A', url: null, sequenceNum: 10 },
  { title: null, url: null, sequenceNum: 11 },
  { title: 'C', url: 'd.com', sequenceNum: 13 },
  { title: 'C', url: 'd.com', sequenceNum: 12 },
];

describe('comparisonChain', () => {
  it('sorts correctly with multiple sorts and nullsLast', () => {
    const sorted1 = [...items].sort(
      comparisonChain<Item>()
        .compare((item) => item.title, ordering.nullsLast)
        .compare((item) => item.url, ordering.nullsLast)
        .compare((item) => item.sequenceNum, ordering.nullsLast)
        .result(),
    );

    console.log('sorted1', sorted1);

    expect(sorted1).toEqual([
      { title: 'A', url: 'b.com', sequenceNum: 2 },
      { title: 'A', url: null, sequenceNum: 5 },
      { title: 'A', url: null, sequenceNum: 7 },
      { title: 'A', url: null, sequenceNum: 10 },
      { title: 'B', url: 'a.com', sequenceNum: 6 },
      { title: 'B', url: 'c.com', sequenceNum: 1 },
      { title: 'C', url: 'd.com', sequenceNum: 4 },
      { title: 'C', url: 'd.com', sequenceNum: 9 },
      { title: 'C', url: 'd.com', sequenceNum: 12 },
      { title: 'C', url: 'd.com', sequenceNum: 13 },
      { title: 'D', url: 'd.com', sequenceNum: null },
      { title: null, url: 'b.com', sequenceNum: 3 },
      { title: null, url: 'd.com', sequenceNum: 8 },
      { title: null, url: null, sequenceNum: 11 },
    ]);
  });

  it('sorts correctly with numeric field', () => {
    const sorted2 = [...items].sort(
      comparisonChain<Item>()
        .compare((item) => item.sequenceNum, ordering.nullsLast)
        .result(),
    );

    console.log('sorted2', sorted2);

    expect(sorted2).toEqual([
      { title: 'B', url: 'c.com', sequenceNum: 1 },
      { title: 'A', url: 'b.com', sequenceNum: 2 },
      { title: null, url: 'b.com', sequenceNum: 3 },
      { title: 'C', url: 'd.com', sequenceNum: 4 },
      { title: 'A', url: null, sequenceNum: 5 },
      { title: 'B', url: 'a.com', sequenceNum: 6 },
      { title: 'A', url: null, sequenceNum: 7 },
      { title: null, url: 'd.com', sequenceNum: 8 },
      { title: 'C', url: 'd.com', sequenceNum: 9 },
      { title: 'A', url: null, sequenceNum: 10 },
      { title: null, url: null, sequenceNum: 11 },
      { title: 'C', url: 'd.com', sequenceNum: 12 },
      { title: 'C', url: 'd.com', sequenceNum: 13 },
      { title: 'D', url: 'd.com', sequenceNum: null },
    ]);
  });

  it('sorts correctly with manual sorting order', () => {
    // Manual sorting order for titles.
    const titleOrder = ['B', 'A', 'D', 'C', null];

    const sorted3 = [...items].sort(
      comparisonChain<Item>()
        .compare((item) => item.title, ordering.manual(titleOrder))
        .compare((item) => item.url, ordering.nullsLast)
        .compare((item) => item.sequenceNum, ordering.nullsLast)
        .result(),
    );

    console.log('sorted3', sorted3);

    expect(sorted3).toEqual([
      { title: 'B', url: 'a.com', sequenceNum: 6 },
      { title: 'B', url: 'c.com', sequenceNum: 1 },
      { title: 'A', url: 'b.com', sequenceNum: 2 },
      { title: 'A', url: null, sequenceNum: 5 },
      { title: 'A', url: null, sequenceNum: 7 },
      { title: 'A', url: null, sequenceNum: 10 },
      { title: 'D', url: 'd.com', sequenceNum: null },
      { title: 'C', url: 'd.com', sequenceNum: 4 },
      { title: 'C', url: 'd.com', sequenceNum: 9 },
      { title: 'C', url: 'd.com', sequenceNum: 12 },
      { title: 'C', url: 'd.com', sequenceNum: 13 },
      { title: null, url: 'b.com', sequenceNum: 3 },
      { title: null, url: 'd.com', sequenceNum: 8 },
      { title: null, url: null, sequenceNum: 11 },
    ]);
  });
});
