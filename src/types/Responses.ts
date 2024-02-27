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

export type DisplayHistory = {
  key: string;
  title: string;
};

type Item = {
  id: string;
  username: string;
  image: string;
  files: Omit<MetaData, "ownerId">[];
};
export type ItemResponse = {
  histories: DisplayHistory[];
  items: Item;
};
export type MetaUploadResponse = {
  meta: MetaData[];
  volume: VolumeSize;
};
