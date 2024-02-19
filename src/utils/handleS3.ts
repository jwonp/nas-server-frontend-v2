import { MetaData } from "@/types/MetaData";
import axios from "axios";
import { randomUUID } from "crypto";
import { getFileType } from "./parseFileType";

import {
  increaseFileAmount,
  setFileAmount,
  setProgressPercent,
} from "@/redux/featrues/fileLoadProgressSlice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { VolumeSize } from "@/types/Volume";

type Nullable<T> = T | null;

/**
 *
 * @param fileType .png와 같은 확장자, . 없이 png 만 사용
 * @param directory ex. /example1/example2
 * @param ownerId user doc id, session.user.id
 * @returns
 */
export const getSignedUrlParams = (
  fileType: string,
  directory: string,
  ownerId: string
) => {
  const key = `storage/${ownerId}/${randomUUID()}.${fileType}`;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: 60,
    // ContentType: `image/${ex}`,}
  };
  return { key, params };
};

const uploadFile = async (
  file: File | null,
  meta: Omit<MetaData, "key" | "uploadTime" | "size" | "fileName" | "type">,
  progressDispatch?: ThunkDispatch<any, undefined, UnknownAction> &
    Dispatch<any>
): Promise<Nullable<MetaData>> => {
  if (!file) {
    return null;
  }

  // @ts-ignore
  const fileType = (file.name as string).split(".").slice(-1)[0];

  const { data } = await axios.get(`/api/storage/file`, {
    params: {
      fileType: fileType,
      directory: meta.directory,
      ownerId: meta.ownerId,
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
  console.log(res);

  const uploadedMeta: MetaData = {
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
/**
 *
 * @param e form 태그에서 onSubmit 함수의 FormEvent 객체
 * @param name Form에서 input 태그 내 name 값
 * @returns S3에 업로드한 파일의 제목
 */
// export const uploadFileToS3ByFormChangeEvent = async (
//   file: File,
//   meta: Omit<MetaData, "key" | "uploadTime" | "size" | "fileName" | "type">
// ): Promise<Nullable<MetaData>> => {
//   const storedMeta = await uploadFile(file, meta);
//   addMeta([storedMeta]);
//   return storedMeta;
// };

/**
 *
 * @param fileList input:type="file" 태그의 FileList
 */
export const uploadFilesToS3ByFileList = async (
  fileList: FileList,
  volume: VolumeSize,
  meta: Omit<MetaData, "key" | "uploadTime" | "size" | "fileName" | "type">,
  progressDispatch: ThunkDispatch<any, undefined, UnknownAction> & Dispatch<any>
) => {
  if (volume.max < 0 || volume.now < 0) {
    return;
  }
  const indexs = Array.from(Array(fileList.length).keys());
  const files = indexs.map((index) => fileList[index]);
  const totalFileSize = files
    .map((file) => file.size)
    .reduce((acc, cur) => acc + cur, 0);
  if (volume.now + totalFileSize > volume.max) {
    return;
  }
  const storedMetas = new Promise<Nullable<MetaData>[]>((resolve, reject) => {
    let metas: Nullable<MetaData>[] = [];
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
  });

  return storedMetas;
};
