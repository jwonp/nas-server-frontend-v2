import ListBar, { ListBarType } from "../ListBar";

const VideoListBar = (props: Omit<ListBarType, "fileIcon">) => {
  return (
    <ListBar
      fileIcon={"video"}
      {...props}
    />
  );
};

export default VideoListBar;
