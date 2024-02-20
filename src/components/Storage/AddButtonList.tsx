import Image from "next/image";
import addFolderIcon from "@public/icons/addFolder.png";
import addFileIcon from "@public/icons/addFile.png";
import { v4 as uuidv4 } from "uuid";
import { uploadFilesToS3ByFileList } from "@/utils/handleS3";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MetaData } from "@/types/MetaData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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

const AddIconSize = 38;

const AddButtonList = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const $fileUploadInput = useRef<HTMLInputElement>(null);
  const volumeQuery = useQuery({
    queryKey: ["volume"],
    queryFn: (): Promise<VolumeSize> =>
      axios.get("/api/user/volume").then((res) => res.data),
    initialData: { max: -1, now: -1 },
    enabled: session?.user.id ? true : false,
  });
  const addMetas = useMutation({
    mutationFn: (metas: MetaData[]) =>
      axios.post("/api/storage/meta", { metas: metas }),
    onSuccess: (data, variables) => {
      const mutations = variables.map((item) => {
        const { ownerId: _, ...rest } = item;
        return rest;
      });
      return mutations;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["volume"] });
      queryClient.invalidateQueries({ queryKey: ["item"] });
    },
  });
  const handleChangeFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || !session?.user.id) {
      return;
    }
    const history = router.query.history as string[];

    const directory = history ? `/${history.join("/")}` : "";
    const meta: Omit<
      MetaData,
      "key" | "uploadTime" | "size" | "fileName" | "type"
    > = {
      directory: directory,
      ownerId: session.user.id,
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
  const handleClickAddFolder = () => {
    if (!session?.user.id) {
      return;
    }
    const history = router.query.history as string[];
    const directory = history ? `/${history.join("/")}` : "";
    const key = `folder$${uuidv4()}`;

    const folderMeta: MetaData = {
      ownerId: session?.user.id,
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
    <div className="grid grid-cols-2 select-none">
      <div
        className="cursor-pointer col-span-1 py-1 flex rounded-l-lg border-l border-r border-t border-b"
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
      <div
        className="cursor-pointer col-span-1 py-1 flex rounded-r-lg border-r border-t border-b"
        onClick={() => {
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
    </div>
  );
};

export default AddButtonList;
