import Image from "next/image";
import addFolderIcon from "@public/icons/addFolder.png";
import addFileIcon from "@public/icons/addFile.png";
import { v4 as uuidv4 } from "uuid";
import { uploadFilesToS3ByFileList } from "@/utils/handleS3";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MetaData } from "@/types/MetaData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAppDispatch } from "@/redux/hooks";
import {
  addFileItemList,
  addFileItemLists,
} from "@/redux/featrues/fileItemListSlice";

const AddIconSize = 38;
const AddButtonList = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const addMetas = useMutation({
    mutationFn: (metas: MetaData[]) =>
      axios.post("/api/storage/meta", { metas: metas }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: (router.query.history as string[])
          ? ["item", { path: (router.query.history as string[]).join("/") }]
          : ["item", ""],
      });
      const mutations = variables.map((item) => {
        const { ownerId: _, ...rest } = item;
        return rest;
      });
      dispatch(addFileItemLists(mutations as Omit<MetaData, "ownerId">[]));
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
    const storedMetas = await uploadFilesToS3ByFileList(files, meta);
    const filterdMetas: MetaData[] = [];
    for (let meta of storedMetas) {
      if (meta) {
        filterdMetas.push(meta);
      }
    }
    addMetas.mutate(filterdMetas);
  };
  //9b0174a2-a013-4c35-a0af-e1437fd26a81.jpeg
  //eb898fef-eed7-40dc-91e0-20fb476da97b.jpeg
  //f1c58d40-8905-4764-af6c-00b0b6a52253.png
  return (
    <div className="grid grid-cols-2 select-none">
      <div className="cursor-pointer col-span-1 py-1 flex rounded-l-lg border-l border-r border-t border-b">
        <div
          className="mx-auto"
          onClick={() => {
            const history = router.query.history as string[];
            const directory = history ? `/${history.join("/")}` : "";

            const folderMeta: Omit<MetaData, "ownerId"> = {
              uploadTime: Date.now(),
              fileName: "새 폴더",
              type: "folder",
              directory: directory,
              key: `folder$${uuidv4()}`,
              size: 0,
            };
            axios
              .post("/api/storage/meta", { metas: [folderMeta] })
              .then(() => {
                dispatch(addFileItemList(folderMeta));
              });
          }}>
          <Image
            src={addFolderIcon}
            alt=""
            width={AddIconSize}
            height={AddIconSize}
          />
        </div>
      </div>
      <div className="col-span-1 py-1 flex rounded-r-lg border-r border-t border-b">
        <div className="mx-auto">
          <label
            htmlFor="file-upload"
            className="cursor-pointer">
            <Image
              src={addFileIcon}
              alt=""
              width={AddIconSize}
              height={AddIconSize}
            />
          </label>
          <div className="hidden">
            <input
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
