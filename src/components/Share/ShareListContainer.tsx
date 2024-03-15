import ShareListBar from "./ShareListBar";

type ShareListContainerProps = {
  title: string;

  children: React.ReactNode;
};
const ShareListContainer = ({ title, children }: ShareListContainerProps) => {
  return (
    <section className="col-span-3 w-full mb-2">
      <nav className="w-full border-b-4 border-white py-0.5">
        <p className="indent-2 text-xl">{title}</p>
      </nav>
      <div >{children}</div>
    </section>
  );
};

export default ShareListContainer;
