/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "@styles/output.css";
import { SWRConfig } from "swr";
import toast from "react-hot-toast";
import Head from "next/head";

// import Script from "next/script";
// import useStore from '@/store/useStore'
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <Head>
        <title>Instagram Caption</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="caption , instagram caption" />
        <link rel="icon" href="/images/instalogo.png" />
      </Head>
      <SWRConfig
        value={{
          onError: (error: any) => {
            if (error.status !== 403 && error.status !== 404) {
              toast.error("error with request");
            }
          },
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
    </>
  );
}
