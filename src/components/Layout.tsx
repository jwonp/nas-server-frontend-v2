import { useAppSelector } from "@/redux/hooks";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { getVisibleSideBar } from "@/redux/featrues/sideBarVisibleSlice";
import { useSession } from "next-auth/react";
import SigninAlert from "./SigninAlert";

const Layout = ({ children }: { children: JSX.Element }) => {
  const isVisibleSidebar = useAppSelector(getVisibleSideBar);
  const { data: session, status } = useSession();
  return (
    <div className="w-screen h-screen min-w-[360px] bg-neutral-900 overflow-y-hidden">
      <header>
        <Header />
      </header>
      {status !== "loading" && (!session || !session?.user) && <SigninAlert />}

      <main className="grid lg:grid-cols-6 grid-cols-1 w-screen min-w-[360px] h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden max-mobile:overflow-scroll overflow-y-hidden">
        <aside
          className={`lg:col-span-1 lg:block lg:static lg:w-full ${
            isVisibleSidebar ? "fixed" : "hidden"
          } w-[240px] h-full bg-neutral-900`}>
          <SideBar />
        </aside>
        <section className="min-w-[360px] lg:col-span-5 col-span-1 h-full max-h-full px-2 overflow-y-hidden">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
