import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FolderAddButton from "./FolderAddButton";
import FileAddButton from "./FileAddButton";
type AddButtonListProps = {
  histories?: string[];
  isItemFetched: boolean;
  isOnError: boolean;
};
const AddIconSize = 38;

const AddButtonList = ({
  histories,
  isItemFetched,
  isOnError,
}: AddButtonListProps) => {
  const [isEnableButtons, setIsEnableButtons] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!isItemFetched) {
      return setIsEnableButtons(() => false);
    }
    if (isOnError) {
      return setIsEnableButtons(() => false);
    }
    setIsEnableButtons(() => true);
  }, [isItemFetched, isOnError]);
  return (
    <div
      className={`grid grid-cols-2 select-none ${
        isEnableButtons ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
      }`}>
      <FolderAddButton
        userId={session?.user.id}
        history={histories}
        AddIconSize={AddIconSize}
        isEnableButtons={isEnableButtons}
      />
      <FileAddButton
        userId={session?.user.id}
        history={histories}
        AddIconSize={AddIconSize}
        isEnableButtons={isEnableButtons}
      />
    </div>
  );
};

export default AddButtonList;
