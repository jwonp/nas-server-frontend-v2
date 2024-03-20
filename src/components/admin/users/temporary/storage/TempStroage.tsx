//temp file
import Image from "next/image";
import AddFileIcon from "@public/icons/addFile.png";
import AddFolderIcon from "@public/icons/addFolder.png";
import RightIcon from "@public/icons/right-white.svg";
import FolderIcon from "@public/icons/folder.png";
import FileIcon from "@public/icons/file.png";
import { useEffect, useMemo, useState } from "react";
import { getRandomPassword } from "@/utils/admin/strings";
import { MetaData } from "@/types/MetaData";

const ADD_ICON_SIZE = 36;
//
type DirectoryItems = {
  [key: string]:
    | Omit<MetaData, "isFavorite" | "uploadTime">
    | { [key: string]: DirectoryItems };
};

const TempStorage = () => {
  const [selectedDirectory, setSelectedDirectory] = useState<string[]>([
    "$root",
  ]);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [fileCount, setFileCount] = useState<number>(0);
  const [items, setItems] = useState<DirectoryItems>({
    $root: {},
  });
  const handleChangeFileUpload = () => {};
  const handleClickFolder = () => {
    const tmp = { ...items };
    const tmpEntries = Object.entries(tmp);
    const folderMeta: Omit<MetaData, "isFavorite" | "uploadTime"> = {
      directory: `/${selectedDirectory.join("/")}`,
      fileName: "새 폴더",
      ownerId: "temp",
      key: `folder$${fileCount}`,
      type: "folder",
      size: 0,
    };
    console.log(tmpEntries);
    tmpEntries.forEach(([title, sub]) => {
      const selectedDirectoryLastItem =
        selectedDirectory[selectedDirectory.length - 1];

      if (selectedDirectoryLastItem === title) {
        Object.defineProperty(sub, `${fileCount}`, {
          value: folderMeta,
          writable: true,
          configurable: true,
          enumerable: true,
        });
        setFileCount((prev) => prev + 1);
      }
      //[ ["$root",{}] ]
    });
    console.log(items);
  };
  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <div className="my-1 mx-4 p-4 rounded-lg bg-slate-800">
      <p className="text-white font-bold text-xl">임시 계정 초기 파일</p>
      <section className="cursor-pointer flex w-1/4 mx-auto mb-4 border-2 rounded-lg">
        <figure className="flex w-full border-r-2">
          <div
            className="mx-auto"
            onClick={handleChangeFileUpload}>
            <Image
              src={AddFileIcon}
              alt={""}
              width={ADD_ICON_SIZE}
              height={ADD_ICON_SIZE}
            />
          </div>
        </figure>
        <figure className="flex w-full">
          <div
            className="mx-auto"
            onClick={handleClickFolder}>
            <Image
              src={AddFolderIcon}
              alt={""}
              width={ADD_ICON_SIZE}
              height={ADD_ICON_SIZE}
            />
          </div>
        </figure>
      </section>
      <section className="border-y-2 min-h-96">
        <Folder
          title={"new folder"}
          depth={0}>
          <File
            title={"file.png"}
            depth={1}
          />
          <File
            title={"file.png"}
            depth={1}
          />
          <File
            title={"file.png"}
            depth={1}
          />
          <File
            title={"file.png"}
            depth={1}
          />
          <Folder
            title={"new folder 2"}
            depth={1}>
            <File
              title={"file.png"}
              depth={2}
            />
            <Folder
              title={"new folder 2"}
              depth={2}>
              <File
                title={"file.png"}
                depth={3}
              />
              <File
                title={"file.png"}
                depth={3}
              />
            </Folder>
          </Folder>
        </Folder>
        <Folder
          title={"new folder 2"}
          depth={0}>
          <></>
        </Folder>
      </section>
    </div>
  );
};

const File = ({ title, depth }: { title: string; depth: number }) => {
  return (
    <section
      style={{ paddingLeft: `${depth === 0 ? 0 : 24}px` }}
      className="indent-2  h-8 ">
      <article className="flex">
        <figure className={`cursor-pointer w-6 my-auto`}>
          <Image
            src={FileIcon}
            alt={""}
            width={24}
            height={24}
          />
        </figure>
        <p className="leading-8">{title}</p>
      </article>
    </section>
  );
};
const Folder = ({
  title,
  depth,
  children,
}: {
  title: string;
  depth: number;
  children: React.ReactNode;
}) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  return (
    <div
      className={``}
      style={{ paddingLeft: `${depth === 0 ? 0 : 24}px` }}>
      <article className="flex h-8">
        <figure
          className={`${
            isOpened ? "rotate-90 duration-100 " : "rotate-0 duration-100 "
          } cursor-pointer w-6 my-auto`}
          onClick={() => {
            setOpened((prev) => !prev);
          }}>
          <Image
            src={RightIcon}
            alt={""}
            width={24}
            height={24}
          />
        </figure>
        <figure className="cursor-pointer w-6 my-auto">
          <Image
            src={FolderIcon}
            alt={""}
            width={24}
            height={24}
          />
        </figure>
        <p className="indent-2 w-full leading-8">{title}</p>
      </article>
      <section
        style={{ marginLeft: `11px` }}
        className={`${
          isOpened ? "block" : "hidden"
        } border-slate-500 border-l`}>
        {children}
      </section>
    </div>
  );
};
export default TempStorage;
// ml-0
//  11 + 0
