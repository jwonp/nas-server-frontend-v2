import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

import { useSession } from "next-auth/react";
import SigninAlert from "./SigninAlert";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";

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

  return (
    <>
      {isHeader && <Header isInvisibleSideBarButton={!isSidebar} />}
      <div className="w-screen min-h-screen min-w-[360px] bg-neutral-900 ">
        <main
          className={`${
            isSignedIn && isSidebar ? "grid lg:grid-cols-layout" : ""
          } w-screen min-w-[360px] h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden  overflow-y-hidden`}>
          {isSignedIn && isSidebar && <SideBar />}
          <article className="flex min-w-[360px] w-full h-full max-h-full px-2 max-lg:px-4 overflow-y-scroll">
            {mainCompoent}
          </article>
        </main>
      </div>
    </>
  );
};

export default Layout;
