import { MetaData } from "@/types/MetaData";
import Image from "next/image";
import addFolderIcon from "@public/icons/addFolder.png";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useMetaMutation } from "@/hooks/useMetaMutation.hook";
type FolderAddButtonProps = {
  userId?: string;
  history?: string[];
  AddIconSize: number;
  isEnableButtons: boolean;
};
const FolderAddButton = ({
  userId,
  history,
  AddIconSize,
  isEnableButtons,
}: FolderAddButtonProps) => {
  const addMetas = useMetaMutation();
  const handleClickAddFolder = () => {
    if (!isEnableButtons) {
      return;
    }
    if (!userId) {
      return;
    }
    // const history = router.query.history as string[];
    const directory =
      history && history.length > 0 ? `/${history.join("/")}` : "";
    const key = `folder$${uuidv4()}`;

    const folderMeta: MetaData = {
      ownerId: userId,
      uploadTime: Date.now(),
      fileName: "새 폴더",
      type: "folder",
      directory: directory,
      key: key,
      size: 0,
    };
    addMetas.mutate([folderMeta]);
  };
  return (
    <div
      className={`col-span-1 py-1 flex rounded-l-lg border-l border-r border-t border-b`}
      onClick={handleClickAddFolder}>
      <div className="mx-auto">
        <Image
          src={addFolderIcon}
          alt=""
          width={AddIconSize}
          height={AddIconSize}
        />
      </div>
    </div>
  );
};
export default FolderAddButton;
