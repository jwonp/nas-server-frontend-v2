import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

import { useSession } from "next-auth/react";
import SigninAlert from "./SigninAlert";
import { useMemo } from "react";

const Layout = ({ children }: { children: JSX.Element }) => {
  const { data: session, status } = useSession();
  const mainCompoent = useMemo(() => {
    if (status === "loading") {
      return <></>;
    }
    if (session && session?.user) {
      return (
        <main className="grid lg:grid-cols-layout w-screen min-w-[360px] h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden  overflow-y-hidden">
          <SideBar />
          <article className="flex min-w-[360px] w-full h-full max-h-full px-2 overflow-y-hidden">
            {children}
          </article>
        </main>
      );
    }
    return <SigninAlert />;
  }, [children, session, status]);
  return (
    <div className="w-screen h-screen min-w-[360px] bg-neutral-900 overflow-y-hidden">
      <Header />
      {mainCompoent}
    </div>
  );
};

export default Layout;
