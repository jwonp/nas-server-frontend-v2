import FileList from "@/components/Storage/FileList/FileList";
import { ERROR_RESPONSE, ITEM_RESPONSE } from "@/utils/strings";
import { useEffect, useMemo, useState } from "react";
import InvaildDirectoryAlert from "../Exception/InvaildDirectoryAlert";
import LoadingErrorAlert from "../Exception/LoadingErrorAlert";
import LoadingFiles from "../Exception/LoadingFiles";
import { ErrorResponse, ItemResponse } from "@/types/Responses";
import ListColumnBar from "@/components/Storage/FileList/ListBar/FileListColumnBar";
import NofilesAlert from "../Exception/NofilesAlert";
import { DisplayHistory, Item } from "@/types/ComponentTypes";
type FileListContainerProps = {
  isLoading: boolean;
  isOnError: boolean;
  isInvalidDirectory:boolean;
  // initItems: ItemResponse | ErrorResponse;
  // data: ItemResponse | ErrorResponse | undefined;
  items: Item | undefined;
  userId: string;
  directory: string;
};
const FilelistContainer = ({
  isLoading,
  isOnError,
  isInvalidDirectory,
  items,
  // initItems,
  userId,
  directory,
}: FileListContainerProps) => {
  // const [items, setItems] = useState<ItemResponse | ErrorResponse | undefined>(
  //   undefined
  // );
  // useEffect(() => {
  //   // const isExistInitItem = initItems !== undefined;
  //   const isItemQueryGotItems = items !== undefined;

  //   // if (isExistInitItem === true && isItemQueryGotItems === false) {
  //   //   return setItems(() => initItems);
  //   // }
  //   if (isItemQueryGotItems === true) {
  //     return setItems(() => data);
  //   }

  //   return setItems(() => undefined);
  // }, [
  //   // initItems,
  //   data,
  // ]);
  const ItemElements = useMemo(() => {
    if (isLoading) {
      return <LoadingFiles />;
    }
    if (isOnError) {
      return <LoadingErrorAlert />;
    }
    // if (Object.keys(initItems).includes(ERROR_RESPONSE.msg)) {
    //   return <InvaildDirectoryAlert />;
    // }
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
  }, [isLoading, isOnError, items, userId, directory]);
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
