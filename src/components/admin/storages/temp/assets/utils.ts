import {
  increaseFileAmount,
  setFileAmount,
} from "@/redux/featrues/fileLoadProgressSlice";
import { MetaData } from "@/types/MetaData";
import { Nullable, uploadFile } from "@/utils/handleS3";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import axios from "axios";
export type TempFileItem = Omit<MetaData, "isFavorite" | "uploadTime"> & {
  originFile?: File;
  isSaved?: boolean;
};
export type DirectoryItems = {
  [key: string]:
    | TempFileItem
    | { [key: string]: TempFileItem | DirectoryItems };
};
export type DirectoryItemsEntry = [
  string,
  (
    | TempFileItem
    | {
        [key: string]: TempFileItem | DirectoryItems;
      }
  )
];

export interface ItemBarProps {
  id: string;
  title: string;
  selectedItem: string;
  depth: number;
  onClick: (e: React.MouseEvent) => void;
  isSaved?: boolean;
}
export const getTempFolderItem = (
  selectedDirectory: string,
  key: string
): Omit<MetaData, "isFavorite" | "uploadTime"> => {
  return {
    directory: `${selectedDirectory}`,
    fileName: "새 폴더",
    ownerId: "temp",
    key: key,
    type: "folder",
    size: 0,
  };
};

export const addProperty = (obj: any, key: string, value: any): any => {
  const tmp = { ...obj };
  return Object.defineProperty(tmp, key, {
    value,
    writable: true,
    configurable: true,
    enumerable: true,
  });
};

export const isSameStringArrayRegardlessOfOrder = (
  array: string[],
  compareTo: string[]
) => {
  const isSame = array.every((el) => compareTo.includes(el));
  return isSame;
};

export const isFile = (
  item: TempFileItem | { [key: string]: TempFileItem | DirectoryItems }
) => {
  const tempItem: TempFileItem = {
    directory: "",
    fileName: "",
    ownerId: "",
    key: "",
    type: "folder",
    size: 0,
  };
  return isSameStringArrayRegardlessOfOrder(
    Object.keys(item),
    Object.keys(tempItem)
  );
};
const addNode = (
  tree: DirectoryItems,
  dirs: string[],
  item: TempFileItem
): DirectoryItems => {
  const node = dirs[0];
  if (dirs[0] === "") {
    if (item.type === "folder") {
      const returnTree = addProperty(tree, item.key, {});

      return returnTree;
    }
    const returnTree = addProperty(tree, item.key, item);
    return returnTree;
  }

  const [first, ...nextdirs] = dirs;
  const nextTree = tree[node] as {
    [key: string]: TempFileItem | DirectoryItems;
  };
  tree[first] = addNode(nextTree, nextdirs, item);

  return tree;
};

export const updateItemTree = (
  itemTree: DirectoryItems,
  items: TempFileItem[]
) => {
  const tempTree: DirectoryItems = { ...itemTree };
  const tempItems = [
    ...items.sort(
      (a, b) => a.directory.split("/").length - b.directory.split("/").length
    ),
  ];

  tempItems.forEach((item) => {
    const [_, ...dirs] = item.directory.split("/");
    const nextTree = tempTree["root"] as {
      [key: string]: TempFileItem | DirectoryItems;
    };
    tempTree["root"] = addNode(nextTree, dirs, item);
  });
  return tempTree;
};

export const openUpdatedFolder = (selectedDirectory: string) => {
  const dirArray = selectedDirectory
    .split("/")
    .toSpliced(0, 1)
    .toSpliced(-1, 1);

  const key = dirArray[dirArray.length - 1] ?? "";
  const dirs = dirArray.toSpliced(-1) ?? [];

  const dirString = dirs.length === 0 ? "/" : `/${dirs.join("/")}/`;
  const id = `folder%${dirString}%${key}%button%closed`;

  const openButton = document.getElementById(id);

  if (openButton) {
    openButton.click();
  }
};

export const getFileNameBySelectedItem = (
  selectedItem: string,
  items: TempFileItem[]
) => {
  const [type, dir, key, ...rest] = selectedItem.split("%");
  if (type !== "folder" && type !== "file") {
    return null;
  }
  const targetItem = items.find((item) => item.key === key);
  if (!targetItem) {
    return null;
  }
  return targetItem.fileName;
};

export const changeSelectedFileName = (
  selectedItem: string,
  items: TempFileItem[],
  newFileName: string
) => {
  const [type, dir, key, ...rest] = selectedItem.split("%");
  if (type !== "folder" && type !== "file") {
    return null;
  }
  const targetItemIndex = items.findIndex((item) => item.key === key);
  if (targetItemIndex === -1) {
    return null;
  }
  items[targetItemIndex].fileName = newFileName;
  return items;
};

export const saveTempFiles = () => {};

export const uploadTempFileList = async (
  items: TempFileItem[],
  progressDispatch: ThunkDispatch<any, undefined, UnknownAction> & Dispatch<any>
) => {
  const fileItems = items.filter((item) => (item.originFile ? true : false));
  if (fileItems.length === 0) {
    return [];
  }
  const storedMetas = new Promise<Nullable<Omit<MetaData, "isFavorite">>[]>(
    (resolve, reject) => {
      let metas: Nullable<Omit<MetaData, "isFavorite">>[] = [];
      if (progressDispatch) {
        progressDispatch(setFileAmount(fileItems.length));
      }
      fileItems.forEach(async (fileItem) => {
        if (!fileItem.originFile) {
          return reject([]);
        }
        const storedMeta = await uploadFile(
          fileItem.originFile,
          { directory: fileItem.directory, ownerId: fileItem.ownerId },
          progressDispatch,
          fileItem.key
        );
        metas.push(storedMeta);
        if (progressDispatch) {
          progressDispatch(increaseFileAmount());
        }
        if (metas.length === fileItems.length) {
          return resolve(metas as Omit<MetaData, "isFavorite">[]);
        }
      });
    }
  );

  return storedMetas;
};
export const convertFolderMetas = (items: TempFileItem[]) => {
  const folders = items.filter((item) => item.type === "folder");
  const folderMetas = folders.map<Omit<MetaData, "isFavorite">>((folder) => {
    folder.key = `folder$${folder.key}`;
    const tempFolder: Omit<MetaData, "isFavorite"> = {
      ...folder,
      uploadTime: Date.now(),
    };
    return tempFolder;
  });
  return folderMetas;
};

export const getRandomIds = async (amount?: number): Promise<string[]> => {
  const { ids } = await axios
    .get(`/api/admin/storages/temp/id?$amount=${amount ?? 1}`)
    .then((res) => res.data);
  return ids;
};
