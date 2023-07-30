import { createClient, ExecutionResult, Sink } from 'graphql-ws';
import {
  Environment,
  FetchFunction,
  Network,
  Observable,
  RecordSource,
  Store,
  SubscribeFunction,
} from 'relay-runtime';
import config from './config';
import { truncateCondensed } from './text/utils/friendlyTruncate';
import logPerf from './utils/logPerf';

// Helps a lot with debugging.
const RELAY_LOGGING = true;

const relay_log = RELAY_LOGGING ? console.log : () => {};

const fetchFn: FetchFunction = async (request, variables) => {
  async function relayRequest() {
    relay_log('Relay request:', request.text, variables);

    // Seems like we need this workaround. Connections are only needed client side.
    // https://stackoverflow.com/questions/67269160/how-do-i-use-the-react-relay-appendnode-directive-with-hasuras-generated-funct
    const { connections, ...editedVariables } = variables;

    const resp = await fetch(config.graphqlRelayEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
        'Content-Type': 'application/json',
        ...config.hasuraAuthHeader,
      },
      body: JSON.stringify({
        query: request.text, // <-- The GraphQL document composed by Relay
        variables: editedVariables,
      }),
    });

    const response = await resp.json();

    relay_log('Relay response', response);
    return response;
  }

  return logPerf(`Relay request ${truncateCondensed(request.text)}`, relayRequest)();
};

const wsClient = createClient({
  url: config.graphqlRelayWsEndpoint,
  connectionParams: {
    headers: {
      ...config.hasuraAuthHeader,
    },
  },
});

// Based on https://relay.dev/docs/guided-tour/updating-data/graphql-subscriptions/#configuring-the-network-layer
// TODO: Error handling here could be better. Failures are obscure.
const subscribeFn: SubscribeFunction = (operation, variables) => {
  if (!operation.name || !operation.text) {
    throw new Error(
      `Missing operation name or text: name: ${operation.name}, text: ${operation.text}`,
    );
  }
  return Observable.create((sink: Sink<ExecutionResult<Record<string, unknown>, unknown>>) => {
    const loggingSink = {
      ...sink,
      next: (value: ExecutionResult<Record<string, unknown>, unknown>) => {
        relay_log('Relay subscription data:', value);
        sink.next(value);
      },
    };
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text as string,
        variables,
      },
      loggingSink,
    );
  }) as any; // Giving up on types here.
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn, subscribeFn),
    store: new Store(new RecordSource()),
  });
}

let relayEnvironment: Environment | undefined;

export function initRelayEnvironment() {
  const environment = relayEnvironment ?? createRelayEnvironment();

  // For SSG and SSR always create a new Relay environment.
  if (typeof window === 'undefined') {
    return environment;
  }

  // Create the Relay environment once in the client
  // and then reuse it.
  if (!relayEnvironment) {
    relayEnvironment = environment;
  }

  return relayEnvironment;
}
