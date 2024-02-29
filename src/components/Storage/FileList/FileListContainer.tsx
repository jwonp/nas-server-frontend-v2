import FileList from "@/components/Storage/FileList/FileList";
import { ERROR_RESPONSE, ITEM_RESPONSE } from "@/utils/strings";
import { useEffect, useMemo, useState } from "react";
import InvaildDirectoryAlert from "../Exception/InvaildDirectoryAlert";
import LoadingErrorAlert from "../Exception/LoadingErrorAlert";
import LoadingFiles from "../Exception/LoadingFiles";
import { ErrorResponse, ItemResponse } from "@/types/Responses";
import ListColumnBar from "@/components/Storage/FileList/ListBar/FileListColumnBar";
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
  const [items, setItems] = useState<ItemResponse>();
  useEffect(() => {
    const isItemQueryGotItems =
      data && Object.keys(data as ItemResponse).includes(ITEM_RESPONSE.items);

    const isExistInitItem = Object.keys(initItems as ItemResponse).includes(
      ITEM_RESPONSE.items
    );
    if (isExistInitItem === true && isItemQueryGotItems === false) {
      return setItems(() => initItems as ItemResponse);
    }
    if (isItemQueryGotItems) {
      return setItems(() => data as ItemResponse);
    }
    return setItems(() => undefined);
  }, [initItems, data]);
  const ItemElements = useMemo(() => {
    if (isLoading) {
      return <LoadingFiles />;
    }
    if (items === undefined) {
      return <LoadingErrorAlert />;
    }
    if (Object.keys(initItems).includes(ERROR_RESPONSE.msg)) {
      return <InvaildDirectoryAlert />;
    }
    return <FileList items={items.items} />;
  }, [isLoading, items, initItems]);
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
