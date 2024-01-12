import axios from "axios";
import { randomUUID } from "crypto";
/**
 * ex.
 *  @directory  /example1/example2
 *  @ownerId    session.user.username
 */
type Nullable<T> = T | null;
export type MetaData = {
  directory: string;
  ownerId: string;
  key: string;
  uploadTime: number;
  size: number;
};
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
  const key = `storage/${ownerId}${directory}/${randomUUID()}.${fileType}`;
  console.log(`key is ${key}`);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: 60,
    // ContentType: `image/${ex}`,}
  };
  return { key, params };
};
const addMeta = async (metas: Nullable<MetaData>[]) => {
  const filterdMetas: MetaData[] = [];
  for (let meta of metas) {
    if (meta) {
      filterdMetas.push(meta);
    }
  }

  await axios.post("/api/storage/meta", { metas: filterdMetas });
  return;
};
const uploadFile = async (
  file: File | null,
  meta: Omit<MetaData, "key" | "uploadTime" | "size">
): Promise<Nullable<MetaData>> => {
  if (!file) {
    return null;
  }

  // @ts-ignore
  const fileType = (file.name as string).split(".").slice(-1)[0];

  const { data } = await axios.get(`/api/media`, {
    params: {
      fileType: fileType,
      directory: meta.directory,
      ownerId: meta.ownerId,
    },
  });

  const { uploadUrl, key } = data;

  await axios.put(uploadUrl, file);

  const uploadedMeta: MetaData = {
    directory: meta.directory,
    ownerId: meta.ownerId,
    key: key,
    uploadTime: Date.now(),
    size: file.size,
  };
  return uploadedMeta;
};
export const uploadProfileIconToS3 = async (file: File) => {
  if (!file) {
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
export const uploadFileToS3ByFormChangeEvent = async (
  file: File,
  meta: Omit<MetaData, "key" | "uploadTime" | "size">
): Promise<Nullable<MetaData>> => {
  const storedMeta = await uploadFile(file, meta);
  addMeta([storedMeta]);
  return storedMeta;
};

/**
 *
 * @param fileList input:type="file" 태그의 FileList
 */
export const uploadFilesToS3ByFileList = async (
  fileList: FileList,
  meta: Omit<MetaData, "key" | "uploadTime" | "size">
) => {
  const indexs = Array.from(Array(fileList.length).keys());
  const files = indexs.map((index) => fileList[index]);

  const storedMetas: Nullable<MetaData>[] = [];

  files.forEach(async (file) => {
    const storedMeta = await uploadFile(file, meta);
    storedMetas.push(storedMeta);
  });

  addMeta(storedMetas);
  return storedMetas;
};
