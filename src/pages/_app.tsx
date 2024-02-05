import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {router.pathname.startsWith("/storage") ? (
             <Layout>
            <Component {...pageProps} />
          </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
