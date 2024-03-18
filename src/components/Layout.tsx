import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

import { useSession } from "next-auth/react";
import SigninAlert from "./SigninAlert";

const Layout = ({ children }: { children: JSX.Element }) => {
  const { data: session, status } = useSession();
  return (
    <div className="w-screen h-screen min-w-[360px] bg-neutral-900 overflow-y-hidden">
      <Header />
      
      {status && status !== "loading" && session && session?.user ? (
        <main className="grid lg:grid-cols-layout w-screen min-w-[360px] h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden  overflow-y-hidden">
          <SideBar />
          <article className="flex min-w-[360px] w-full h-full max-h-full px-2 overflow-y-hidden">
            {children}
          </article>
        </main>
      ) : (
        <SigninAlert />
      )}
    </div>
  );
};

export default Layout;
