import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import Head from 'next/head';
import React from 'react';
import createEmotionCache from 'styles/createEmotionCache';
import theme from 'styles/theme';

import Layout from 'src/layout';
import store from 'src/state/store';

import type { EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // ignore typechecker error untill developer includes "children" in props : https://github.com/ctrlplusb/easy-peasy/issues/741
  const AnyStoreProvider = StoreProvider as any;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AnyStoreProvider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnyStoreProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
