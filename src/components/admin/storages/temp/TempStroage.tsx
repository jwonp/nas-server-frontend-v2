//temp file
import Image from "next/image";
import AddFileIcon from "@public/icons/addFile.png";
import AddFolderIcon from "@public/icons/addFolder.png";
import EditIcon from "@public/icons/edit.png";
import DeleteIcon from "@public/icons/delete.png";
import React, { useEffect, useMemo, useRef, useState } from "react";

import DirectoryContainer from "./assets/DirectoryContainer";
import {
  DirectoryItems,
  TempFileItem,
  changeSelectedFileName,
  convertFolderMetas,
  getFileNameBySelectedItem,
  getTempFolderItem,
  openUpdatedFolder,
  updateItemTree,
  uploadTempFileList,
  getRandomIds,
} from "./assets/utils";
import { getFileType } from "@/utils/parseFileType";
import ItemBarList from "./assets/ItemBarList";
import { Nullable, getFileArrayByFileList } from "@/utils/handleS3";
import ProgressSnackBar from "@/components/Storage/SnackBar/ProgressSnackBar";
import { useAppDispatch } from "@/redux/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MetaData } from "@/types/MetaData";
import {
  resetFileAmount,
  resetProgressPercent,
} from "@/redux/featrues/fileLoadProgressSlice";
import {
  ErrorResponse,
  SuccessResponse,
  TempMetaResponse,
} from "@/types/Responses";
import { response } from "@/utils/request";

const ADD_ICON_SIZE = 36;

const TempStorage = () => {
  const progressDispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const $input = useRef<HTMLInputElement>(null);
  const $fileNameInput = useRef<HTMLInputElement>(null);
  const [isNotAllowSave, setNotAllowSave] = useState<boolean>(false);
  const [selectedDirectory, setSelectedDirectory] = useState<string>("/");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [editedFileName, setEditedFileName] = useState<string>("");

  const [items, setItems] = useState<TempFileItem[]>([]);
  const [itemTree, setItemTree] = useState<DirectoryItems>({ root: {} });
  const tempMetasQuery = useQuery<
    SuccessResponse<TempMetaResponse> | ErrorResponse
  >({
    queryKey: ["meta", "temp", "stoarges"],
    queryFn: () =>
      response<TempMetaResponse>(axios.get("/api/admin/storages/temp/meta")),

    refetchInterval: false,
  });

  const uploadTempFiles = useMutation({
    mutationFn: (metas: Nullable<Omit<MetaData, "isFavorite">>[]) =>
      response(axios.post("/api/admin/storages/temp/meta", { metas })),
    onSuccess: () => {
      progressDispatch(resetProgressPercent());
      progressDispatch(resetFileAmount());
      queryClient.invalidateQueries({ queryKey: ["meta", "temp", "stoarges"] });
    },
  });

  const updateTempFiles = useMutation({
    mutationFn: (metas: (MetaData & { id: string })[]) =>
      response(axios.put("/api/admin/storages/temp/meta", { metas })),
  });
  const deleteTempFiles = useMutation({
    mutationFn: (vars: {
      metas: (MetaData & { id: string })[];
      deletedItems: TempFileItem[];
    }) =>
      response(
        axios.delete("/api/admin/storages/temp/meta", {
          data: { metas: vars.metas },
        })
      ),
  });
  const handleChangeFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!$input.current) {
      return;
    }
    if (!files) {
      e.target.value = "";
      return;
    }

    const existFiles = getFileArrayByFileList(files);
    const randomIds = await getRandomIds(existFiles.length);
    const fileMetas = existFiles.map<TempFileItem>((file, index) => {
      const randomKey = randomIds[index];
      return {
        directory: selectedDirectory,
        fileName: file.name,
        ownerId: "temp",
        key: randomKey,
        size: file.size,
        type: getFileType(file.type),
        originFile: file,
      };
    });
    openUpdatedFolder(selectedDirectory);
    setItems((prev) => [...prev, ...fileMetas]);

    e.target.value = "";
  };
  const handleClickFolder = async (e: React.MouseEvent) => {
    const randomIds = await getRandomIds();
    openUpdatedFolder(selectedDirectory);
    setItems((prev) => [
      ...prev,
      getTempFolderItem(selectedDirectory, randomIds[0]),
    ]);
  };
  const handleClickFolderBar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const id = (e.target as HTMLElement).id;

    if (!id) {
      return;
    }
    const parsedId = id.split("%");

    const [type, dir, key, ...rest] = parsedId;

    const openSwitch =
      document.getElementById(`${id}%button%closed`) ??
      document.getElementById(`${id}%button%opened`);

    if (openSwitch) {
      openSwitch.click();
    }
    setSelectedItem(() => id);
    if (type === "folder") {
      setSelectedDirectory(() => `${dir}${key}/`);
    }
  };
  const handleClickFileBar = (e: React.MouseEvent) => {
    const id = (e.target as HTMLElement).id;
    if (!id) {
      return;
    }

    setSelectedItem(() => id);
  };

  const handleChangeEditedFileName = (e: React.ChangeEvent) => {
    e.stopPropagation();
    if (!$fileNameInput.current) {
      return;
    }
    const replaceTo = $fileNameInput.current.value;
    setEditedFileName(() => replaceTo);
  };
  const directories = useMemo(() => {
    const key = 0;
    const value = 1;
    const rootItemTreeEntires = Object.entries(itemTree);
    if (rootItemTreeEntires[0][key] !== "root") {
      return <p>error</p>;
    }
    if (rootItemTreeEntires[0][value] === undefined) {
      return <p>empty</p>;
    }
    const itemTreeEntires = Object.entries(rootItemTreeEntires[0][value]);
    return (
      <ItemBarList
        entries={itemTreeEntires}
        items={items}
        selectedItem={selectedItem}
        handleClickFileBar={handleClickFileBar}
        handleClickFolderBar={handleClickFolderBar}
      />
    );
  }, [itemTree, items, selectedItem]);
  const handleClickSaveButton = async () => {
    const { tempMetas } = tempMetasQuery.data?.body as TempMetaResponse;
    const savedItems = items.filter((item) => item.isSaved === true);
    const updatedItems = tempMetas
      .filter((meta) => {
        const key =
          meta.type === "folder"
            ? meta.key.split("folder$")[1]
            : meta.key.split("storage/temp/")[1].split(".")[0];

        const origin = savedItems.find((item) => key === item.key);

        if (!origin) {
          return false;
        }
        if (key === origin.key && meta.fileName !== origin.fileName) {
          return true;
        }
        return false;
      })
      .map((meta) => {
        const key =
          meta.type === "folder"
            ? meta.key.split("folder$")[1]
            : meta.key.split("storage/temp/")[1].split(".")[0];

        const origin = savedItems.find((item) => key === item.key);

        return { ...meta, fileName: origin ? origin.fileName : meta.fileName };
      });
    const notSavedItems = items.filter((item) => item.isSaved !== true);
    if (updatedItems.length === 0 && notSavedItems.length === 0) {
      setNotAllowSave(() => true);
      setTimeout(() => {
        setNotAllowSave(() => false);
      }, 900);
    }

    if (updatedItems.length > 0) {
      updateTempFiles.mutate(updatedItems);
    }
    let uploadedFileMetas: Nullable<Omit<MetaData, "isFavorite">>[] = [];
    if (notSavedItems.length > 0) {
      uploadedFileMetas = [
        ...uploadedFileMetas,
        ...(await uploadTempFileList(notSavedItems, progressDispatch)),
      ];
    }
    const folderMetas = convertFolderMetas(notSavedItems);
    const itemMetas = [...uploadedFileMetas, ...folderMetas];
    uploadTempFiles.mutate(itemMetas);
  };
  useEffect(() => {
    setItemTree(() => updateItemTree(itemTree, items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  useEffect(() => {
    if (!$fileNameInput.current) {
      return;
    }
    const newItems = changeSelectedFileName(
      selectedItem,
      items,
      editedFileName
    );
    if (!newItems) {
      return;
    }
    setItems(() => newItems);
    setItemTree(() => updateItemTree(itemTree, newItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedFileName]);

  useEffect(() => {
    if (!$fileNameInput.current) {
      return;
    }
    $fileNameInput.current.value =
      getFileNameBySelectedItem(selectedItem, items) ?? "";
  }, [items, selectedItem]);

  useEffect(() => {
    setItemTree(() => updateItemTree(itemTree, items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  useEffect(() => {
    if (!$fileNameInput.current) {
      return;
    }
    const newItems = changeSelectedFileName(
      selectedItem,
      items,
      editedFileName
    );
    if (!newItems) {
      return;
    }
    setItems(() => newItems);
    setItemTree(() => updateItemTree(itemTree, newItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedFileName]);
  useEffect(() => {
    const targetItem = items.find(
      (item) => `${item.type}%${item.directory}%${item.key}` === selectedItem
    );
    if (targetItem) {
      setEditedFileName(() => targetItem.fileName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);
  useEffect(() => {
    if (!$fileNameInput.current) {
      return;
    }
    $fileNameInput.current.value =
      getFileNameBySelectedItem(selectedItem, items) ?? "";
  }, [items, selectedItem]);

  useEffect(() => {
    if (tempMetasQuery.isError) {
      return;
    }
    if (tempMetasQuery.isSuccess) {
      const { tempMetas } = tempMetasQuery.data?.body as TempMetaResponse;
      const initItems = tempMetas.map<TempFileItem>((meta) => {
        const key =
          meta.type === "folder"
            ? meta.key.split("folder$")[1]
            : meta.key.split("storage/temp/")[1].split(".")[0];
        const tempFileItem: TempFileItem = {
          directory: meta.directory,
          fileName: meta.fileName,
          ownerId: "temp",
          key: key,
          type: meta.type,
          size: meta.size,
          isSaved: true,
        };
        return tempFileItem;
      });

      setItems(() => initItems);
    }
  }, [tempMetasQuery.data, tempMetasQuery.isError, tempMetasQuery.isSuccess]);

  const handleClickDeleteItems = () => {
    const target = items.find((item) => {
      console.log(item.key, selectedItem.split("%")[2]);
      return item.key === selectedItem.split("%")[2];
    });
    console.log(target);
    if (!target) {
      return;
    }

    let subDeleteItems: TempFileItem[] = [];
    if (target?.type === "folder") {
      const deleteDir = `${target.directory}${target.key}/`;
      subDeleteItems = [
        ...items.filter((item) => item.directory.startsWith(deleteDir)),
      ];
    }

    const targetToDeleteItems = [target, ...subDeleteItems];

    const deletedItems = items.filter(
      (item) =>
        targetToDeleteItems.map((del) => del.key).includes(item.key) === false
    );

    const savedDeltedTargetItemKeys = targetToDeleteItems
      .filter((item) => item.isSaved === true)
      .map((item) => item.key);

    if (savedDeltedTargetItemKeys.length > 0) {
      const { tempMetas } = tempMetasQuery.data?.body as TempMetaResponse;
      const targetDeleteMetas = tempMetas.filter((meta) => {
        const key =
          meta.type === "folder"
            ? meta.key.split("folder$")[1]
            : meta.key.split("storage/temp/")[1].split(".")[0];
        if (savedDeltedTargetItemKeys.includes(key)) {
          return true;
        }
        return false;
      });
      deleteTempFiles.mutate({
        metas: targetDeleteMetas,
        deletedItems: deletedItems,
      });
    }
    setSelectedDirectory(() => "/");
    setSelectedItem(() => "");
    setItems(() => deletedItems);
  };

  return (
    <div className="my-1 mx-4 p-4 rounded-lg bg-slate-800">
      <p className="text-white font-bold text-xl">임시 계정 초기 파일</p>

      <section className="bg-slate-900 rounded-lg mt-1 mb-4">
        <div className="flex">
          <article
            className={`${
              selectedItem.length === 0 ? "hidden" : "block"
            } flex rounded-lg  px-4 py-3`}>
            <div className="flex my-auto relative">
              <div className="relative">
                <input
                  ref={$fileNameInput}
                  className="bg-slate-600 rounded-lg p-2 indent-1"
                  value={editedFileName}
                  disabled={selectedItem.length === 0}
                  onChange={handleChangeEditedFileName}
                />
                <figure className={`absolute right-2 top-2`}>
                  <Image
                    src={EditIcon}
                    alt={""}
                    width={24}
                    height={24}
                  />
                </figure>
              </div>
              {selectedItem.length > 0 && (
                <div
                  className="ml-5 my-auto overflow-hidden rounded-xl"
                  onClick={handleClickDeleteItems}>
                  <figure className="hover:bg-slate-500 bg-slate-600 p-1">
                    <Image
                      src={DeleteIcon}
                      alt={""}
                      width={28}
                      height={28}
                    />
                  </figure>
                </div>
              )}
            </div>
          </article>
          <article className="flex gap-3 p-4 select-none ml-auto">
            <button
              className={`${
                isNotAllowSave
                  ? "hover:bg-red-500 bg-red-600 "
                  : "hover:bg-blue-500 bg-blue-600 "
              } w-30 h-10 my-auto px-3 rounded-lg`}
              onClick={handleClickSaveButton}>
              저장
            </button>
          </article>
        </div>
      </section>
      <section className="cursor-pointer flex w-1/4 mx-auto mb-4 border-2 rounded-lg">
        <figure
          className="flex w-full border-r-2"
          onClick={(e) => {
            console.log(e.target);
            if ($input.current) {
              $input.current.click();
            }
          }}>
          <div className="mx-auto">
            <Image
              src={AddFileIcon}
              alt={""}
              width={ADD_ICON_SIZE}
              height={ADD_ICON_SIZE}
            />
          </div>
          <input
            ref={$input}
            type="file"
            className="hidden"
            multiple
            onInput={handleChangeFileUpload}
          />
        </figure>
        <figure
          className="flex w-full"
          onClick={handleClickFolder}>
          <div className="mx-auto">
            <Image
              src={AddFolderIcon}
              alt={""}
              width={ADD_ICON_SIZE}
              height={ADD_ICON_SIZE}
            />
          </div>
        </figure>
      </section>
      <DirectoryContainer
        selectedItem={selectedItem}
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "storage-root") {
            setSelectedDirectory(() => "/");
            setSelectedItem(() => "");
          }
        }}>
        {directories}
      </DirectoryContainer>
      <ProgressSnackBar />
    </div>
  );
};

export default TempStorage;
