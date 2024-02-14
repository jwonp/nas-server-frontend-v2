import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { getVisibleSideBar } from "@/redux/featrues/sideBarVisibleSlice";
import { signIn, useSession } from "next-auth/react";
const Layout = ({ children }: { children: JSX.Element }) => {
  const isVisibleSidebar = useAppSelector(getVisibleSideBar);
  const { data: session } = useSession();

  return (
    <div className="w-screen h-screen min-w-[360px] bg-neutral-900">
      <header>
        <Header />
      </header>
      {(!session || !session?.user) && (
        <div className="flex w-screen h-screen">
          <div className="m-auto">
            <div className="flex w-[320px] h-fit p-6 rounded-lg bg-slate-600">
              <div className="w-full">
                <div className=" text-center mb-4">
                  로그인이 필요한 서비스 입니다.
                </div>
                <div className="flex">
                  <div
                    className="mx-auto text-center cursor-pointer underline decoration-solid"
                    onClick={() => {
                      signIn();
                    }}>
                    로그인
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {session?.user && (
        <main className="grid lg:grid-cols-6 grid-cols-1 w-screen min-w-[360px] h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden max-mobile:overflow-scroll overflow-y-hidden">
          <aside
            className={`lg:col-span-1 lg:block lg:static lg:w-full ${
              isVisibleSidebar ? "fixed" : "hidden"
            } w-[240px] h-full bg-neutral-900`}>
            <SideBar />
          </aside>
          <section className="min-w-[360px] lg:col-span-5 col-span-1 h-full max-h-full px-2">
            {children}
          </section>
        </main>
      )}
    </div>
  );
};

export default Layout;
