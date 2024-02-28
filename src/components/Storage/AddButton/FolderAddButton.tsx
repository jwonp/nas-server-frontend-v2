import { MetaData } from "@/types/MetaData";
import { MutateOptions, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import Image from "next/image";
import addFolderIcon from "@public/icons/addFolder.png";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
type FolderAddButtonProps = {
  userId?: string;
  history?: string[];
  mutate: (
    variables: MetaData[],
    options?:
      | MutateOptions<AxiosResponse<any, any>, Error, MetaData[], unknown>
      | undefined
  ) => void;
  AddIconSize: number;
  isEnableButtons: boolean;
};
const FolderAddButton = ({
  userId,
  history,
  mutate,
  AddIconSize,
  isEnableButtons,
}: FolderAddButtonProps) => {
  useEffect(() => {
    console.log(userId, history, AddIconSize, isEnableButtons);
  }, [userId, history, AddIconSize, isEnableButtons]);

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
    mutate([folderMeta]);
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
