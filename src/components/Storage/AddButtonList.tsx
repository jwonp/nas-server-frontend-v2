import Image from "next/image";
import addFolderIcon from "@public/icons/addFolder.png";
import addFileIcon from "@public/icons/addFile.png";

import { uploadFilesToS3ByFileList } from "@/utils/handleS3";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MetaData } from "@/types/MetaData";

const AddIconSize = 38;
const AddButtonList = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleChangeFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.files);

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
    const keys = await uploadFilesToS3ByFileList(files, meta);
    console.log(keys);

    // axios
    //   .post("/api/storage/file/meta", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };
  //9b0174a2-a013-4c35-a0af-e1437fd26a81.jpeg
  //eb898fef-eed7-40dc-91e0-20fb476da97b.jpeg
  //f1c58d40-8905-4764-af6c-00b0b6a52253.png
  return (
    <div className="grid grid-cols-2 select-none">
      <div className=" cursor-pointer col-span-1 py-1 flex rounded-l-lg border-l border-r border-t border-b">
        <div className="mx-auto">
          <Image
            src={addFolderIcon}
            alt=""
            width={AddIconSize}
            height={AddIconSize}
          />
        </div>
      </div>
      <div className="  col-span-1 py-1 flex rounded-r-lg border-r border-t border-b">
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
