import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
const isWithHeaderPage = (pathname: string) => {
  return (
    pathname.startsWith("/storage") ||
    pathname.startsWith("/share") ||
    pathname.startsWith("/admin") ||
    pathname === "/"
  );
};
const isWithSidebarPage = (pathname: string) => {
  return !(pathname.startsWith("/admin") || pathname === "/");
};
const isNotNeedSignInPage = (pathname: string) => {
  return pathname.startsWith("/auth") || pathname === "/";
};
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();

  const [isPageWithHeader, setPageWithHeader] = useState<boolean>(() =>
    isWithHeaderPage(router.pathname)
  );
  const [isPageWithSidebar, setPageWithSidebar] = useState<boolean>(() =>
    isWithSidebarPage(router.pathname)
  );
  const [isOnNotNeedSignInPage, setOnNotNeedSignInPage] = useState<boolean>(
    () => isNotNeedSignInPage(router.pathname)
  );

  useEffect(() => {
    setPageWithHeader(() => isWithHeaderPage(router.pathname));
    setPageWithSidebar(() => isWithSidebarPage(router.pathname));
    setOnNotNeedSignInPage(() => isNotNeedSignInPage(router.pathname));
  }, [router.pathname]);

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
          <Layout
            isHeader={isPageWithHeader}
            isSidebar={isPageWithSidebar}
            isOnNotNeedSignInPage={isOnNotNeedSignInPage}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
