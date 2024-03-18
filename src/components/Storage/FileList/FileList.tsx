import { getTimeString } from "@/utils/parseTime";

import { useMemo } from "react";

import NofilesAlert from "../Exception/NofilesAlert";
import ListBar from "./ListBar/ListBar";
import { Item } from "@/types/ComponentTypes";
type FileListProps = {
  items: Item;
  userId: string;
  directory: string;
};
const FileList = ({ items, userId, directory }: FileListProps) => {
  const itemElements = useMemo(() => {
    if (items && items.files.length === 0) {
      return <NofilesAlert />;
    }

    return items.files.map((meta, index) => {
      const metas = {
        fileId: meta.key,
        uploadTime: getTimeString(meta.uploadTime),
        title: meta.fileName,
        owner: items.username,
        ownerImage: items.image,
        fileIcon: meta.type,
        fileSize: meta.size,
        isFavorite: meta.isFavorite,
      };
      return (
        <ListBar
          key={index}
          directory={directory}
          userId={userId}
          metas={metas}
        />
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return itemElements;
};
export default FileList;
