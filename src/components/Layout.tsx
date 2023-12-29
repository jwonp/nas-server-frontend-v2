import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

const Layout = ({ children }: { children: JSX.Element }) => {
  
  return (
    <div className='w-screen h-screen bg-neutral-900'>
      <header>
        <Header />
      </header>
      <main className="grid grid-cols-6 w-screen h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden">
        <aside className="col-span-1 h-full">
          <SideBar />
        </aside>
        <section className="col-span-5 h-full max-h-full px-2">{children}</section>
      </main>
    </div>
  );
};

export default Layout;
