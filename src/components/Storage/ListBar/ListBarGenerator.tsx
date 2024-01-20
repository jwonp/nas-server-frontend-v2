import { MetaData, fileTypes } from "@/types/MetaData";
import ImageListBar from "./ListBarTemplates/ImageListBar";
import { getTimeString } from "@/utils/parseTime";
import { convertFileSize } from "@/utils/parseFileSize";
import VideoListBar from "./ListBarTemplates/VideoListBar";
import FolderListBar from "./ListBarTemplates/FolderListBar";
import FileListBar from "./ListBarTemplates/FileListBar";

interface ListBarGeneratorProps {
  userId: string;
  username: string;
  userIcon: string | undefined;
  meta: Omit<MetaData, "ownerId">;
}
const ListBarGenerator = ({
  userId,
  username,
  userIcon,
  meta,
}: ListBarGeneratorProps) => {
  const metas = {
    uploadTime: getTimeString(meta.uploadTime),
    title: meta.fileName,
    owner: username,
    ownerImage: userIcon,
    fileSize: convertFileSize(meta.size),
  };
  if (meta.type === fileTypes.image) return <ImageListBar {...metas} />;
  if (meta.type === fileTypes.video) {
    return <VideoListBar {...metas} />;
  }
  if (meta.type === fileTypes.folder) {
    return (
      <FolderListBar
        title={metas.title}
        owner={metas.owner}
        ownerImage={metas.ownerImage}
        uploadTime={null}
        fileSize={null}
      />
    );
  }
  return <FileListBar {...metas} />;
};

export default ListBarGenerator;
