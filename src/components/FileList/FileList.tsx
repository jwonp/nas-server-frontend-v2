import { getTimeString } from "@/utils/parseTime";

import { useMemo } from "react";

import NofilesAlert from "../Storage/Exception/NofilesAlert";
import ListBar from "./ListBar/ListBar";
import { Item } from "@/types/Responses";
type FileListProps = {
  items: Item;
};
const FileList = ({ items }: FileListProps) => {
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
      };
      return (
        <ListBar
          key={index}
          {...metas}
        />
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return itemElements;
};
export default FileList;
