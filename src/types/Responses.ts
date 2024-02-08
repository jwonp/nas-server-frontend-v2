import { MetaData } from "./MetaData";
import { VolumeSize } from "./Volume";

interface BasicResponse {
  status: number;
}
export interface SuccessResponse extends BasicResponse {
  data: any;
}

export interface ErrorResponse extends BasicResponse {
  msg: string;
}

export type IsExistDirectoryResponse = {
  isExistDirectory: boolean;
};
export type DisplayHistoryResponse = {
  key: string;
  title: string;
};
export type ItemResponse = {
  id: string;
  username: string;
  image: string;
  files: Omit<MetaData, "ownerId">[];
};
export type MetaUploadResponse = {
  meta: MetaData[];
  volume: VolumeSize;
};
