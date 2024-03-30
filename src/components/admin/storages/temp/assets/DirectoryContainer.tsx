type DirectoryContainerProps = {
  selectedItem: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
};
const DirectoryContainer = ({
  selectedItem,
  onClick,
  children,
}: DirectoryContainerProps) => {
  return (
    <section
      id={"storage-root"}
      className={`${
        selectedItem.length > 0 ? "border-white" : "border-slate-600"
      } border-y-2  min-h-96 select-none`}
      onClick={onClick}>
      {children}
    </section>
  );
};
export default DirectoryContainer;
