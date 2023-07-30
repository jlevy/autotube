import { fromGlobalId, toGlobalId } from 'graphql-relay';

// Convert a Hasura global id to get the database uuid.
export const parseHasuraGlobalId = (globalId: string) => {
  const { type, id: idString } = fromGlobalId(globalId);
  // Hasura Relay encoding is JSON.
  const [id, schema, table, uuid] = JSON.parse(idString) as string[];
  return { type, id, schema, table, uuid };
};

export function uuidFromGlobalId(globalId: string): string;
export function uuidFromGlobalId(globalId: undefined | null): undefined;
export function uuidFromGlobalId(globalId: string | undefined | null): string | undefined;

export function uuidFromGlobalId(globalId: string | undefined | null): string | undefined {
  if (!globalId) {
    return undefined;
  }
  try {
    const { uuid } = parseHasuraGlobalId(globalId);
    return uuid;
  } catch (e) {
    console.error('uuidFromGlobalId: could not parse global id', globalId, e);
    throw e;
  }
}

// Completely dummy global id. Useful for optimistic renders.
export const dummyGlobalId = (key: string) =>
  toGlobalId('dummy', JSON.stringify([key, '', '', '']));
