import FileList from "@/components/Storage/FileList/FileList";
import { ERROR_RESPONSE, ITEM_RESPONSE } from "@/utils/strings";
import { useEffect, useMemo, useState } from "react";
import InvaildDirectoryAlert from "../Exception/InvaildDirectoryAlert";
import LoadingErrorAlert from "../Exception/LoadingErrorAlert";
import LoadingFiles from "../Exception/LoadingFiles";
import { ErrorResponse, ItemResponse } from "@/types/Responses";
import ListColumnBar from "@/components/Storage/FileList/ListBar/FileListColumnBar";
import NofilesAlert from "../Exception/NofilesAlert";
type FileListContainerProps = {
  isLoading: boolean;
  initItems: ItemResponse | ErrorResponse;
  data: ItemResponse | ErrorResponse | undefined;
};
const FilelistContainer = ({
  isLoading,
  data,
  initItems,
}: FileListContainerProps) => {
  const [items, setItems] = useState<ItemResponse | ErrorResponse | undefined>(
    undefined
  );
  useEffect(() => {
    const isExistInitItem = initItems !== undefined;
    const isItemQueryGotItems = data !== undefined;

    if (isExistInitItem === true && isItemQueryGotItems === false) {
      return setItems(() => initItems);
    }
    if (isItemQueryGotItems === true) {
      return setItems(() => data);
    }

    return setItems(() => undefined);
  }, [initItems, data]);
  const ItemElements = useMemo(() => {
    if (isLoading) {
      return <LoadingFiles />;
    }
    if (data === undefined) {
      return <LoadingErrorAlert />;
    }
    if (Object.keys(initItems).includes(ERROR_RESPONSE.msg)) {
      return <InvaildDirectoryAlert />;
    }
    if (items === undefined) {
      return <NofilesAlert />;
    }
    return <FileList items={(items as ItemResponse).items} />;
  }, [isLoading, data, initItems, items]);
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
