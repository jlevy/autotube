import '@/styles/css/globals.css';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { useEffect, useMemo } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { RecordSource } from 'relay-runtime';
import { chakraTheme } from '@/styles/utils/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { RelayPageProps } from '../relay-types';
import { initRelayEnvironment } from '../RelayEnvironment';

import type { AppProps } from 'next/app';

TimeAgo.addDefaultLocale(en);

export default function App({ Component, pageProps }: AppProps<RelayPageProps>) {
  const environment = useMemo(initRelayEnvironment, []);

  useEffect(() => {
    // Set up Relay environment.
    const store = environment.getStore();

    // Hydrate the store.
    console.log(`Hydrating Relay store with ${pageProps?.initialRecords?.length || 0} records`);
    store.publish(new RecordSource(pageProps.initialRecords));

    // Notify any existing subscribers.
    store.notify();
  }, [environment, pageProps.initialRecords]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <ChakraProvider theme={chakraTheme}>
          <Component {...pageProps} />

      </ChakraProvider>
    </RelayEnvironmentProvider>
  );
}
