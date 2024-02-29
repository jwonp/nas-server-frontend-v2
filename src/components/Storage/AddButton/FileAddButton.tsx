import Image from "next/image";
import addFileIcon from "@public/icons/addFile.png";
import { uploadFilesToS3ByFileList } from "@/utils/handleS3";
import { useAppDispatch } from "@/redux/hooks";
import {
  resetFileAmount,
  resetProgressPercent,
} from "@/redux/featrues/fileLoadProgressSlice";
import { VolumeSize } from "@/types/Volume";
import {
  SnackBarProps,
  setWarningSnackBar,
} from "@/redux/featrues/snackBarSwitchSlice";
import { useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MetaData } from "@/types/MetaData";
import { useMetaMutation } from "@/hooks/useMetaMutation.hook";
type FileAddButtonProps = {
  userId?: string;
  history?: string[];
  AddIconSize: number;
  isEnableButtons: boolean;
};
const FileAddButton = ({
  userId,
  history,
  AddIconSize,
  isEnableButtons,
}: FileAddButtonProps) => {
  const dispatch = useAppDispatch();
  const addMetas = useMetaMutation();
  const $fileUploadInput = useRef<HTMLInputElement>(null);
  const volumeQuery = useQuery({
    queryKey: ["volume"],
    queryFn: (): Promise<VolumeSize> =>
      axios.get("/api/user/volume").then((res) => res.data),
    initialData: { max: -1, now: -1 },
    enabled: userId ? true : false,
  });
  const handleChangeFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isEnableButtons) {
      return;
    }
    const files = e.target.files;
    if (!files || !userId) {
      return;
    }
    // const history = router.query.history as string[];
    
    const directory = history && history.length > 0 ? `/${history.join("/")}` : "";
    const meta: Omit<
      MetaData,
      "key" | "uploadTime" | "size" | "fileName" | "type"
    > = {
      directory: directory,
      ownerId: userId,
    };

    const storedMetas = await uploadFilesToS3ByFileList(
      files,
      volumeQuery.data,
      meta,
      dispatch
    );
    if (!storedMetas) {
      const warningSnackBarProps: SnackBarProps = {
        isVisible: true,
        message: "저장 공간이 부족합니다.",
      };
      dispatch(setWarningSnackBar(warningSnackBarProps));
      return;
    }
    const filterdMetas: MetaData[] = [];
    for (let meta of storedMetas) {
      if (meta) {
        filterdMetas.push(meta);
      }
    }
    dispatch(resetProgressPercent());
    dispatch(resetFileAmount());
    addMetas.mutate(filterdMetas);
  };
  return (
    <div
      className={`col-span-1 py-1 flex rounded-r-lg border-r border-t border-b`}
      onClick={() => {
        if (!isEnableButtons) {
          return;
        }
        if (!$fileUploadInput.current) {
          return;
        }
        $fileUploadInput.current.click();
      }}>
      <div className="mx-auto">
        <label
          htmlFor="file-upload"
          onClick={(e) => {
            e.preventDefault();
          }}>
          <Image
            src={addFileIcon}
            alt=""
            width={AddIconSize}
            height={AddIconSize}
          />
        </label>
        <div className="hidden">
          <input
            ref={$fileUploadInput}
            id="file-upload"
            name="file-upload"
            type="file"
            multiple
            onChange={handleChangeFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default FileAddButton;
