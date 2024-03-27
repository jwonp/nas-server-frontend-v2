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
import MoreIcon from "@public/icons/more.svg";
import editTitleIcon from "@public/icons/edit.png";
import downloadIcon from "@public/icons/download.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useHover } from "@uidotdev/usehooks";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { convertFileSize } from "@/utils/parseFileSize";
import { downloadFile, getDownloadMediaUrl } from "@/utils/download";
import { useAppDispatch } from "@/redux/hooks";
import { setImageMedia, setVideoMedia } from "@/redux/featrues/mediaSlice";

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
  directory: string;
  userId: string;
  metas: {
    fileId: string;
    title: string;
    owner: string;
    isFavorite: boolean;
    ownerImage: string | StaticImport | null | undefined;
    uploadTime: string | null;
    fileIcon: fileIconType;
    fileSize: number;
    isPending?: boolean;
  };
};

const FileTypeIconSize = 40;
const ButtonIconSize = 28;
const WIDTH_ON_LG = 767;
const ListBar = ({ directory, userId, metas }: ListBarType) => {
  const $listBar = useRef<HTMLDivElement>(null);
  const [ref, hovering] = useHover();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isClickedMore, setClickedMore] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [fileTitle, setFileTitle] = useState<string>(metas.title);
  const [isEditTitle, setEditTitle] = useState<boolean>(false);
  const [editSkipFlag, setEditSkipFlag] = useState<boolean>(true);
  const [isFolder, setIsFolder] = useState<boolean>(false);
  const iconQuery = useQuery({
    queryKey: ["icon", { source: metas.ownerImage }],
    queryFn: (): Promise<{ url: string }> =>
      axios
        .get(`/api/storage/download?key=${metas.ownerImage}`)
        .then((res) => res.data),
    enabled: metas.ownerImage ? true : false,
    refetchInterval: false,
  });

  const renameFile = useMutation({
    mutationFn: (variables: { fileId: string; title: string }) =>
      axios.patch(`/api/storage/meta/title`, {
        fileId: variables.fileId,
        title: variables.title,
      }),
    onSuccess: () => {
      if (metas.isFavorite) {
        queryClient.invalidateQueries({ queryKey: ["favorite", userId] });
      }
      queryClient.invalidateQueries({
        queryKey: ["item", { path: directory }],
      });
    },
  });
  const deleteFile = useMutation({
    mutationFn: (fileId: string) =>
      axios.delete("/api/storage/item", {
        data: {
          fileId: fileId,
          fileSize: metas.fileSize,
          fileType: metas.fileIcon,
          directory: directory !== "" ? "/" + directory : "",
        },
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["item", { path: directory }],
      });
      queryClient.invalidateQueries({
        queryKey: ["volume"],
      });
    },
  });
  useEffect(() => {
    setFileTitle(metas.title);
  }, [metas.title]);
  useEffect(() => {
    if (editSkipFlag) {
      setEditSkipFlag(false);
      return;
    }
    if (!isEditTitle) {
      renameFile.mutate({
        fileId: metas.fileId,
        title: fileTitle,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditTitle]);

  useEffect(() => {
    const isHovering = hovering;
    const isOnLandScape =
      $listBar.current?.offsetWidth &&
      $listBar.current?.offsetWidth > WIDTH_ON_LG;
    const isHoveringOnLandscape = isHovering && isOnLandScape;

    if (isHoveringOnLandscape) {
      return setVisible(true);
    }
    setVisible(false);
  }, [hovering]);

  useEffect(() => {
    setIsFolder(() => !isEditTitle && metas.fileIcon === "folder");
  }, [isEditTitle, metas.fileIcon]);

  return (
    <div
      ref={$listBar}
      className={`${
        metas.isPending && metas.isPending === true
          ? "opacity-50"
          : "opacity-100"
      }`}>
      <div
        ref={ref}
        className="grid grid-cols-16 w-full min-w-[360px] h-14 py-1 cursor-pointer select-none border-b">
        <article className="col-span-7 max-file:col-span-8 max-mobile:col-span-10">
          <div
            className="grid grid-cols-listBarTitle gap-2"
            onClick={() => {
              if (isFolder) {
                router.push(
                  `${router.asPath}/${metas.fileId.split("folder$")[1]}`
                );
              }
            }}>
            <div className="my-auto w-10 h-10">
              <Image
                className="w-10 h-10"
                src={fileIcons[metas.fileIcon]}
                alt=""
                width={FileTypeIconSize}
                height={FileTypeIconSize}
              />
            </div>
            {isEditTitle ? (
              <input
                className="text-white truncate leading-12 text-lg font-semibold font-['Inter'] bg-neutral-700 focus:outline-none focus:border-0"
                value={fileTitle}
                onBlur={(e) => {
                  e.preventDefault();
                  setEditTitle((prev) => !prev);
                }}
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
              <div
                className={`text-white truncate leading-12 text-lg font-semibold font-['Inter']`}
                onClick={async () => {
                  if (metas.fileIcon === "video") {
                    const url = await getDownloadMediaUrl(metas.fileId);
                    dispatch(setVideoMedia({ src: url, title: fileTitle }));
                  }
                  if (metas.fileIcon === "image") {
                    const url = await getDownloadMediaUrl(metas.fileId);
                    dispatch(setImageMedia({ src: url, title: fileTitle }));
                  }
                }}>
                {fileTitle}
              </div>
            )}
          </div>
        </article>
        <article className="col-span-2 max-md:hidden max-mobile:hidden">
          <div className="flex">
            <div className="mx-auto">
              <div className="flex gap-2">
                <div className="my-auto  rounded-full overflow-hidden max-h-7 h-7 w-7  relative">
                  <Image
                    src={
                      iconQuery && iconQuery.data
                        ? iconQuery.data?.url
                        : userIcon
                    }
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className=" text-white truncate leading-12 text-lg font-semibold font-['Inter']">
                  {metas.owner ?? "-"}
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="col-span-2 max-md:col-span-3 max-file:col-span-3 max-mobile:hidden text-center truncate leading-12 text-white text-lg font-semibold font-['Inter']">
          {`${metas.uploadTime ?? "-"}`}
        </article>
        <article className="col-span-2 max-md:col-span-3  max-file:hidden text-center leading-12 text-white text-lg font-semibold font-['Inter']">
          {`${convertFileSize(metas.fileSize) ?? "-"}`}
        </article>

        <section
          className={`col-span-3 max-file:col-span-5 max-mobile:col-span-6 flex  justify-between w-full ${
            !isClickedMore ? "max-lg:ml-auto" : ""
          } ${
            !isVisible
              ? "lg:hidden"
              : "transition-opacity  duration-1000 ease-in"
          }`}>
          <div
            className={`${
              isClickedMore ? " max-lg:hidden" : ""
            } lg:hidden`}></div>
          <div className={`flex${!isClickedMore ? " max-lg:hidden" : ""}`}>
            <article className="flex gap-1">
              {metas.fileIcon !== "folder" && (
                <figure className="my-auto w-9 h-9 lg:hover:bg-slate-500 rounded-full">
                  <div
                    className="m-1 w-7 h-7 "
                    onClick={() => {
                      downloadFile(metas.fileId, metas.title);
                    }}>
                    <Image
                      src={downloadIcon}
                      alt=""
                      width={ButtonIconSize}
                      height={ButtonIconSize}
                    />
                  </div>
                </figure>
              )}
              <figure className="my-auto w-9 h-9 lg:hover:bg-slate-500  rounded-full">
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
              </figure>

              <figure className="my-auto w-9 h-9 lg:hover:bg-slate-500  rounded-full">
                <div
                  className="m-1 w-7 h-7 "
                  onClick={() => {
                    deleteFile.mutate(metas.fileId);
                  }}>
                  <Image
                    src={deleteIcon}
                    alt=""
                    width={ButtonIconSize}
                    height={ButtonIconSize}
                  />
                </div>
              </figure>
            </article>
          </div>
          <figure
            className="lg:hidden max-lg:block my-auto w-9 h-9  float-right rounded-full"
            onClick={() => {
              setClickedMore((prev) => !prev);
            }}>
            <div className="m-1 w-7 h-7 ">
              <Image
                src={MoreIcon}
                alt=""
                width={ButtonIconSize}
                height={ButtonIconSize}
              />
            </div>
          </figure>
        </section>
      </div>
    </div>
  );
};
export default ListBar;
