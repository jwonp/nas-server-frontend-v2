import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();
  console.log(router.pathname);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Head>
            <title>Nas Server</title>

            <meta charSet="utf-8" />
            <meta
              name="author"
              content="Ikiningyou"
            />
            <meta
              name="description"
              content="This service is the Cloud Stoarge Service."
            />
            <link
              rel="icon"
              href="/favicon.ico"
            />
          </Head>
          {router.pathname.startsWith("/auth") ||
          router.pathname.startsWith("/admin") ||
          router.pathname === "/" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
