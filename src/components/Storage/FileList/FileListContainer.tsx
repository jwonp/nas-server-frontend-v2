import FileList from "@/components/Storage/FileList/FileList";
import { useMemo } from "react";
import InvaildDirectoryAlert from "../Exception/InvaildDirectoryAlert";
import LoadingErrorAlert from "../Exception/LoadingErrorAlert";
import LoadingFiles from "../Exception/LoadingFiles";
import ListColumnBar from "@/components/Storage/FileList/ListBar/FileListColumnBar";
import NofilesAlert from "../Exception/NofilesAlert";
import { Item } from "@/types/ComponentTypes";
type FileListContainerProps = {
  isLoading: boolean;
  isOnError: boolean;
  isInvalidDirectory: boolean;
  items: Item | undefined;
  userId: string;
  directory: string;
};
const FilelistContainer = ({
  isLoading,
  isOnError,
  isInvalidDirectory,
  items,
  userId,
  directory,
}: FileListContainerProps) => {
  const ItemElements = useMemo(() => {
    if (isLoading) {
      return <LoadingFiles />;
    }
    if (isInvalidDirectory) {
      return <InvaildDirectoryAlert />;
    }
    if (isOnError) {
      return <LoadingErrorAlert />;
    }
    if (items === undefined) {
      return <NofilesAlert />;
    }
    return (
      <FileList
        userId={userId}
        items={items}
        directory={directory}
      />
    );
  }, [isLoading, isOnError, isInvalidDirectory, items, userId, directory]);
  return (
    <>
      <ListColumnBar />
      <div className="w-full h-[calc(100vh-56px-132px)] max-h-[calc(100vh-56px-132px)] overflow-scroll overflow-x-hidden">
        {ItemElements}
      </div>
    </>
  );
};

export default FilelistContainer;
