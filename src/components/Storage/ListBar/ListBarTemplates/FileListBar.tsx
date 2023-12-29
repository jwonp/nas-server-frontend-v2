import ListBar, { ListBarType } from "../ListBar";

const FileListBar = (props: Omit<ListBarType, "fileIcon">) => {
  return (
    <ListBar
      fileIcon={"file"}
      {...props}
    />
  );
};

export default FileListBar;
