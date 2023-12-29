import Image from "next/image";
import logoIcon from "@public/icons/logo.jpeg";
import folderIcon from "@public/icons/folder.png";
import backIcon from "@public/icons/arrowLeft.png";
import addFolderIcon from "@public/icons/addFolder.png";
import addFileIcon from "@public/icons/addFile.png";
import fileIcon from "@public/icons/file.png";
import imageIcon from "@public/icons/photo.png";
import videoIcon from "@public/icons/video.png";
import logoutIcon from "@public/icons/logout.png";
import userIcon from "@public/icons/userCircle.png";
import deleteIcon from "@public/icons/delete.png";
import favoriteIcon from "@public/icons/star.png";
import editTitleIcon from "@public/icons/edit.png";
import downloadIcon from "@public/icons/download.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";
import { useHover } from "@uidotdev/usehooks";
const fileIcons = {
  back: backIcon,
  addFolder: addFolderIcon,
  addFile: addFileIcon,
  file: fileIcon,
  folder: folderIcon,
  image: imageIcon,
  video: videoIcon,
} as const;

type fileIconType = keyof typeof fileIcons;

export type ListBarType = {
  title: string;
  owner: string;
  ownerImage: string | StaticImport | null;
  uploadTime: string | null;
  fileIcon: fileIconType;
  fileSize: string | null;
};

const FileTypeIconSize = 40;
const ButtonIconSize = 28;

const ListBar = ({
  title,
  owner,
  ownerImage,
  uploadTime,
  fileIcon,
  fileSize,
}: ListBarType) => {
  const [ref, hovering] = useHover();
  return (
    <div
      ref={ref}
      className="grid grid-cols-16 w-full h-14 py-1 cursor-pointer select-none border-b">
      <div className="col-span-7 flex gap-2">
        <div className="my-auto">
          <Image
            className="w-10 h-10"
            src={fileIcons[fileIcon]}
            alt=""
            width={FileTypeIconSize}
            height={FileTypeIconSize}
          />
        </div>
        <div className=" text-white leading-12 text-lg font-semibold font-['Inter']">
          {title}
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex">
          <div className="mx-auto">
            <div className="flex gap-2">
              <div className="py-2">
                <Image
                  className="w-7 h-7"
                  src={ownerImage ?? userIcon}
                  alt=""
                  width={ButtonIconSize}
                  height={ButtonIconSize}
                />
              </div>
              <div className=" text-white leading-12 text-lg font-semibold font-['Inter']">
                {owner}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 text-center leading-12 text-white text-lg font-semibold font-['Inter']">
        {`${uploadTime ?? "-"}`}
      </div>
      <div className="col-span-2 text-center leading-12 text-white text-lg font-semibold font-['Inter']">
        {`${fileSize ?? "-"}`}
      </div>
      <div
        className={`col-span-3 flex gap-2 ${
          hovering ? "opacity-100" : "opacity-0"
        }`}>
        <div className="my-auto w-9 h-9 hover:bg-slate-500 rounded-full">
          <div className="m-1 w-7 h-7 ">
            <Image
              src={downloadIcon}
              alt=""
              width={ButtonIconSize}
              height={ButtonIconSize}
            />
          </div>
        </div>
        <div className="my-auto w-9 h-9 hover:bg-slate-500 rounded-full">
          <div className="m-1 w-7 h-7 ">
            <Image
              src={editTitleIcon}
              alt=""
              width={ButtonIconSize}
              height={ButtonIconSize}
            />
          </div>
        </div>
        {fileIcon === "folder" && (
          <div className="my-auto w-9 h-9 hover:bg-slate-500 rounded-full">
            <div className="m-1 w-7 h-7 ">
              <Image
                src={favoriteIcon}
                alt=""
                width={ButtonIconSize}
                height={ButtonIconSize}
              />
            </div>
          </div>
        )}
        <div className="my-auto w-9 h-9 hover:bg-slate-500 rounded-full">
          <div className="m-1 w-7 h-7 ">
            <Image
              src={deleteIcon}
              alt=""
              width={ButtonIconSize}
              height={ButtonIconSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListBar;
