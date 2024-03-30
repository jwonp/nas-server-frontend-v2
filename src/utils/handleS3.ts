import { MetaData } from "@/types/MetaData";
import axios from "axios";

import { getFileType } from "./parseFileType";

import {
  increaseFileAmount,
  setFileAmount,
  setProgressPercent,
} from "@/redux/featrues/fileLoadProgressSlice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { VolumeSize } from "@/types/Volume";
import { randomUUID } from "crypto";

export type Nullable<T> = T | null;

/**
 *
 * @param fileType .png와 같은 확장자, . 없이 png 만 사용
 * @param ownerId user doc id, session.user.id
 * @param preKey 있는 경우 이걸로 키 설정
 * @returns
 */
export const getSignedUrlParams = (
  fileType: string,
  ownerId: string,
  preKey?: string
) => {
  const key = `storage/${ownerId}/${
    preKey ? preKey : randomUUID()
  }.${fileType}`;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: 60,
    // ContentType: `image/${ex}`,}
  };
  return { key, params };
};

export const uploadFile = async (
  file: File | null,
  meta: Omit<
    MetaData,
    "key" | "uploadTime" | "size" | "fileName" | "type" | "isFavorite"
  >,
  progressDispatch?: ThunkDispatch<any, undefined, UnknownAction> &
    Dispatch<any>,
  preKey?: string
): Promise<Nullable<Omit<MetaData, "isFavorite">>> => {
  if (!file) {
    return null;
  }

  // @ts-ignore
  const fileType = (file.name as string).split(".").slice(-1)[0];

  const { data } = await axios.get(`/api/storage/file`, {
    params: {
      fileType: fileType,
      ownerId: meta.ownerId,
      preKey,
    },
  });

  const { uploadUrl, key } = data;

  const res = await axios.put(uploadUrl, file, {
    onUploadProgress: (event) => {
      if (!event.total || !progressDispatch) {
        return;
      }
      let percent = (event.loaded * 100) / event.total;
      let percentCompleted = Math.round(percent);
      progressDispatch(setProgressPercent(percentCompleted));
    },
  });

  const uploadedMeta: Omit<MetaData, "isFavorite"> = {
    directory: meta.directory,
    fileName: file.name,
    ownerId: meta.ownerId,
    key: key,
    uploadTime: Date.now(),
    size: file.size,
    type: getFileType(file.type),
  };
  return uploadedMeta;
};
export const uploadProfileIconToS3 = async (file: File) => {
  if (!file.name) {
    return null;
  }
  const fileType = (file.name as string).split(".").slice(-1)[0];
  const { data } = await axios.get(`/api/user/icon`, {
    params: { fileType: fileType },
  });
  const { uploadUrl, key } = data;

  await axios.put(uploadUrl, file);
  return key;
};

export const getFileArrayByFileList = (fileList: FileList) => {
  const indexs = Array.from(Array(fileList.length).keys());
  const files = indexs.map((index) => fileList[index]);
  return files;
};
/**
 * @param fileList input:type="file" 태그의 FileList
 */
export const uploadFilesToS3ByFileList = async (
  fileList: FileList,
  volume: VolumeSize,
  meta: Omit<
    MetaData,
    "key" | "uploadTime" | "size" | "fileName" | "type" | "isFavorite"
  >,
  progressDispatch: ThunkDispatch<any, undefined, UnknownAction> & Dispatch<any>
) => {
  if (volume.max < 0 || volume.now < 0) {
    return;
  }

  const files = getFileArrayByFileList(fileList);
  const totalFileSize = files
    .map((file) => file.size)
    .reduce((acc, cur) => acc + cur, 0);
  if (volume.now + totalFileSize > volume.max) {
    console.log(totalFileSize);
    return;
  }
  const storedMetas = new Promise<Nullable<Omit<MetaData, "isFavorite">>[]>(
    (resolve, reject) => {
      let metas: Nullable<Omit<MetaData, "isFavorite">>[] = [];
      if (progressDispatch) {
        progressDispatch(setFileAmount(files.length));
      }
      files.forEach(async (file, index) => {
        const storedMeta = await uploadFile(file, meta, progressDispatch);
        metas.push(storedMeta);
        if (progressDispatch) {
          progressDispatch(increaseFileAmount());
        }
        if (metas.length === files.length) {
          return resolve(metas);
        }
      });
      if (files.length < 1) {
        return reject([]);
      }
    }
  );

  return storedMetas;
};
