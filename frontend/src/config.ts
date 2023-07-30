function ensure(value: string | undefined): string {
  if (value === undefined) {
    throw new Error('Missing environment variable!');
  }
  return value;
}

// TODO: Separate client and server configs clearly.

const config = {
  backendUrl: ensure(process.env.NEXT_PUBLIC_BACKEND_URL),
  backendApiPrefix: ensure(process.env.NEXT_PUBLIC_BACKEND_API_PREFIX),
  graphqlRelayEndpoint: ensure(process.env.NEXT_PUBLIC_GRAPHQL_RELAY_ENDPOINT),
  graphqlRelayWsEndpoint: ensure(process.env.NEXT_PUBLIC_GRAPHQL_RELAY_WS_ENDPOINT),
  // FIXME: Local testing only, don't expose this and use x-hasura-access-key instead.
  hasuraAuthHeader: {
    'x-hasura-admin-secret': ensure(process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET),
  },
};

export default config;
