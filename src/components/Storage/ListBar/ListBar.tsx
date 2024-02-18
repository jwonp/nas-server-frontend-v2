import Image from "next/image";
import folderIcon from "@public/icons/folder.png";
import backIcon from "@public/icons/arrowLeft.png";
import addFolderIcon from "@public/icons/addFolder.png";
import addFileIcon from "@public/icons/addFile.png";
import fileIcon from "@public/icons/file.png";
import imageIcon from "@public/icons/photo.png";
import videoIcon from "@public/icons/video.png";
import userIcon from "@public/icons/userCircle.png";
import deleteIcon from "@public/icons/delete.png";
import favoriteIcon from "@public/icons/star.png";
import editTitleIcon from "@public/icons/edit.png";
import downloadIcon from "@public/icons/download.png";
import ShareIcon from "@public/icons/share.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { useHover } from "@uidotdev/usehooks";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { useDirectoryArray } from "@/hooks/useDirectory.hook";
import { convertFileSize } from "@/utils/parseFileSize";
import { downloadFile } from "@/utils/download";

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
  fileId: string;
  title: string;
  owner: string;

  ownerImage: string | StaticImport | null | undefined;
  uploadTime: string | null;
  fileIcon: fileIconType;
  fileSize: number;
};

const FileTypeIconSize = 40;
const ButtonIconSize = 28;

const ListBar = ({
  title,
  owner,
  ownerImage,
  fileId,
  uploadTime,
  fileIcon,
  fileSize,
}: ListBarType) => {
  const [ref, hovering] = useHover();
  const queryClient = useQueryClient();
  const router = useRouter();
  const directoryArray = useDirectoryArray();
  const [fileTitle, setFileTitle] = useState<string>(title);
  const [isEditTitle, setEditTitle] = useState<boolean>(false);
  const [editSkipFlag, setEditSkipFlag] = useState<boolean>(true);
  const iconQuery = useQuery({
    queryKey: ["icon", { source: ownerImage }],
    queryFn: (): Promise<{ url: string }> =>
      axios
        .get(`/api/storage/download?key=${ownerImage}`)
        .then((res) => res.data),
  });

  const deleteFile = useMutation({
    mutationFn: (fileId: string) =>
      axios.delete("/api/storage/item", {
        data: {
          fileId: fileId,
          fileSize: fileSize,
          fileType: fileIcon,
          directory: `/${directoryArray.join("/")}`,
        },
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["item", { path: directoryArray }],
      });
      queryClient.invalidateQueries({
        queryKey: ["volume"],
      });
    },
  });
  useEffect(() => {
    setFileTitle(title);
  }, [title]);
  useEffect(() => {
    if (editSkipFlag) {
      setEditSkipFlag(false);
      return;
    }
    if (!isEditTitle) {
      axios.patch(`/api/storage/meta/title`, {
        fileId: fileId,
        title: fileTitle,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditTitle]);
  return (
    <div
      ref={ref}
      className="grid grid-cols-16 w-full min-w-[360px] h-14 py-1 cursor-pointer select-none border-b">
      <div className="col-span-7  max-file:col-span-8 max-mobile:col-span-10">
        <div
          className="grid grid-cols-listBarTitle gap-2"
          onClick={() => {
            if (!isEditTitle && fileIcon === "folder") {
              router.push(`${router.asPath}/${fileId.split("folder$")[1]}`);
            }
          }}>
          <div className="my-auto w-10 h-10">
            <Image
              className="w-10 h-10"
              src={fileIcons[fileIcon]}
              alt=""
              width={FileTypeIconSize}
              height={FileTypeIconSize}
            />
          </div>
          {isEditTitle ? (
            <input
              className="text-white truncate leading-12 text-lg font-semibold font-['Inter'] bg-neutral-700 focus:outline-none focus:border-0"
              value={fileTitle}
              onChange={(e) => {
                setFileTitle(() => e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key.toLowerCase() === "enter") {
                  e.preventDefault();
                  setEditTitle((prev) => !prev);
                }
              }}
            />
          ) : (
            <div className="text-white truncate leading-12 text-lg font-semibold font-['Inter']">
              {fileTitle}
            </div>
          )}
        </div>
      </div>
      <div className="col-span-2 max-md:hidden max-mobile:hidden">
        <div className="flex">
          <div className="mx-auto">
            <div className="flex gap-2">
              <div className="my-auto  rounded-full overflow-hidden max-h-7 h-7 w-7  relative">
                <Image
                  src={
                    iconQuery && iconQuery.data ? iconQuery.data?.url : userIcon
                  }
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className=" text-white truncate leading-12 text-lg font-semibold font-['Inter']">
                {owner ?? "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 max-md:col-span-3 max-file:col-span-3 max-mobile:hidden text-center truncate leading-12 text-white text-lg font-semibold font-['Inter']">
        {`${uploadTime ?? "-"}`}
      </div>
      <div className="col-span-2 max-md:col-span-3  max-file:hidden text-center leading-12 text-white text-lg font-semibold font-['Inter']">
        {`${convertFileSize(fileSize) ?? "-"}`}
      </div>
      <div
        className={`col-span-3 flex gap-2 max-md:col-span-3 max-file:col-span-4 max-mobile:col-span-6 ${
          hovering ? "opacity-100" : "opacity-0"
        }`}>
        {fileIcon !== "folder" && (
          <div className="my-auto w-9 h-9 hover:bg-slate-500 rounded-full">
            <div
              className="m-1 w-7 h-7 "
              onClick={() => {
                downloadFile(fileId, title);
              }}>
              <Image
                src={downloadIcon}
                alt=""
                width={ButtonIconSize}
                height={ButtonIconSize}
              />
            </div>
          </div>
        )}
        <div className="my-auto w-9 h-9 hover:bg-slate-500 rounded-full">
          <div
            className="m-1 w-7 h-7 "
            onClick={() => setEditTitle(!isEditTitle)}>
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
          <div
            className="m-1 w-7 h-7 "
            onClick={() => {
              deleteFile.mutate(fileId);
            }}>
            <Image
              src={deleteIcon}
              alt=""
              width={ButtonIconSize}
              height={ButtonIconSize}
            />
          </div>
        </div>
        <div className="my-auto w-9 h-9 hover:bg-slate-500 rounded-full">
          <div
            className="m-1 w-7 h-7 "
            onClick={() => {
              deleteFile.mutate(fileId);
            }}>
            <Image
              src={ShareIcon}
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
