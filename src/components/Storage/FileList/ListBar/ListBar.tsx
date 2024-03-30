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
import favoriteIcon from "@public/icons/favorite.png";
import favoritedIcon from "@public/icons/favorited.png";
import ShareIcon from "@public/icons/share.png";
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
import { downloadFile } from "@/utils/download";
import { useAppDispatch } from "@/redux/hooks";
import { turnOnShareModal } from "@/redux/featrues/modalSwitchSlice";
import ControlButton from "./ControlButton";

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
  };
};

const FileTypeIconSize = 32;

const WIDTH_ON_LG = 767;
const ListBar = ({ directory, userId, metas }: ListBarType) => {
  const dispatch = useAppDispatch();
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
  });
  const changeFavorite = useMutation({
    mutationFn: (variables: { directory: string; folder: string }) =>
      axios.put("/api/storage/favorite", {
        directory: variables.directory,
        folder: variables.folder,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorite", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["item", { path: directory }],
      });
    },
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
  const handleClickDownload = () => {
    downloadFile(metas.fileId, metas.title);
  };
  const handleClickFavorite = () => {
    changeFavorite.mutate({
      directory: directory,
      folder: metas.fileId,
    });
  };
  const handleClickEditFileName = () => setEditTitle(!isEditTitle);
  const handleClickDelete = () => {
    deleteFile.mutate(metas.fileId);
  };
  const handleClickShare = () => {
    dispatch(turnOnShareModal(metas.title));
  };
  const handleClickMore = () => {
    setClickedMore((prev) => !prev);
  };
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
    <div ref={$listBar}>
      <div
        ref={ref}
        className="grid grid-cols-16 w-full min-w-[360px] h-12 py-1 cursor-pointer select-none border-b">
        <article className="col-span-6 max-file:col-span-8 max-mobile:col-span-10">
          <div
            className="grid grid-cols-listBarTitle gap-2"
            onClick={() => {
              if (isFolder) {
                router.push(
                  `${router.asPath}/${metas.fileId.split("folder$")[1]}`
                );
              }
            }}>
            <div className="m-auto w-8 h-8">
              <Image
                src={fileIcons[metas.fileIcon]}
                alt=""
                width={FileTypeIconSize}
                height={FileTypeIconSize}
              />
            </div>
            {isEditTitle ? (
              <input
                className="text-white truncate leading-10 text-lg font-semibold font-['Inter'] bg-neutral-700 focus:outline-none focus:border-0"
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
              <div className="text-white truncate leading-10  font-semibold font-['Inter']">
                {fileTitle}
              </div>
            )}
          </div>
        </article>
        <article className="col-span-2 max-md:hidden max-mobile:hidden">
          <div className="flex">
            <div className="mx-auto">
              <div className="flex gap-2">
                <div className="my-auto  rounded-full overflow-hidden max-h-5 h-5 w-5  relative">
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
                <div className=" text-white truncate leading-10 font-semibold font-['Inter']">
                  {metas.owner ?? "-"}
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="col-span-2 max-md:col-span-3 max-file:col-span-3 max-mobile:hidden text-center truncate leading-10 text-white font-semibold font-['Inter']">
          {`${metas.uploadTime ?? "-"}`}
        </article>
        <article className="col-span-2 max-md:col-span-3  max-file:hidden text-center leading-10 text-white font-semibold font-['Inter']">
          {`${convertFileSize(metas.fileSize) ?? "-"}`}
        </article>

        <section
          className={`col-span-4 max-file:col-span-5 max-mobile:col-span-6 flex  justify-between w-full ${
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
                <ControlButton
                  icon={downloadIcon}
                  onClick={handleClickDownload}
                />
              )}
              <ControlButton
                icon={editTitleIcon}
                onClick={handleClickEditFileName}
              />

              {/* {metas.fileIcon === "folder" && ( )} */}
              <ControlButton
                icon={metas.isFavorite ? favoritedIcon : favoriteIcon}
                onClick={handleClickFavorite}
              />
              <ControlButton
                icon={deleteIcon}
                onClick={handleClickDelete}
              />
              <ControlButton
                icon={ShareIcon}
                onClick={handleClickShare}
              />
            </article>
          </div>
          <ControlButton
            className="lg:hidden max-lg:block my-auto w-9 h-9  float-right rounded-full"
            icon={MoreIcon}
            onClick={handleClickMore}
          />
        </section>
      </div>
    </div>
  );
};
export default ListBar;
