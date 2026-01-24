import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@seed-health/tokens/css/variables.css';
import '@/styles/seed-tokens.scss';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Seed Frontend Engineering Takehome</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
