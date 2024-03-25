import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

import { useSession } from "next-auth/react";
import SigninAlert from "./SigninAlert";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { getWindowWidth } from "@/utils/imageHandler";
import { setWidth } from "@/redux/featrues/windowWidthSlice";
import { MAIN_ID } from "@/utils/strings";
type LayoutProps = {
  isSidebar: boolean;
  isHeader: boolean;
  isOnNotNeedSignInPage: boolean;
  children: JSX.Element;
};
const Layout = ({
  isHeader,
  isSidebar,
  isOnNotNeedSignInPage,
  children,
}: LayoutProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSignedIn, setSignedIn] = useState<boolean>(
    status === "authenticated"
  );
  const mainCompoent = useMemo(() => {
    if (status === "loading") {
      return <></>;
    }
    if (session && session?.user) {
      return children;
    }
    if (isOnNotNeedSignInPage) {
      return children;
    }
    return <SigninAlert />;
  }, [children, isOnNotNeedSignInPage, session, status]);
  useEffect(() => {
    setSignedIn(() => status === "authenticated");
  }, [status]);
  useEffect(() => {
    if (router.isReady) {
      if (!document) return;
      const mainWrapper = document.getElementById(MAIN_ID);
      if (!mainWrapper) {
        return;
      }
      dispatch(setWidth(getWindowWidth(mainWrapper)));
      window.addEventListener("resize", () => {
        dispatch(setWidth(getWindowWidth(mainWrapper)));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  return (
    <>
      {isHeader && <Header isInvisibleSideBarButton={!isSidebar} />}
      <div
        id={MAIN_ID}
        className="w-screen min-w-[360px] bg-neutral-900 ">
        <main
          className={`${
            isSignedIn && isSidebar ? "grid lg:grid-cols-layout" : ""
          } w-screen min-w-[360px] h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden  overflow-y-hidden`}>
          {isSignedIn && isSidebar && <SideBar />}
          <article className="flex min-w-[360px] w-full h-full max-h-full px-2 overflow-y-scroll">
            {mainCompoent}
          </article>
        </main>
      </div>
    </>
  );
};

export default Layout;
