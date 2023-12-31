import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { getVisibleSideBar } from "@/redux/featrues/sideBarVisibleSlice";
const Layout = ({ children }: { children: JSX.Element }) => {
  const isVisibleSidebar = useAppSelector(getVisibleSideBar)
  
  return (
    <div className="w-screen h-screen bg-neutral-900">
      <header>
        <Header />
      </header>
      <main className="grid lg:grid-cols-6 grid-cols-1 w-screen h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden">
        <aside
          className={`lg:col-span-1 lg:block lg:static lg:w-full ${
            isVisibleSidebar ? "fixed" : "hidden"
          } w-[240px] h-full bg-neutral-900`}>
          <SideBar />
        </aside>
        <section className="lg:col-span-5 col-span-1 h-full max-h-full px-2">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
