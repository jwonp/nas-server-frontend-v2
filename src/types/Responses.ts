import { FileType, MetaData } from "./MetaData";
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

export type Item = {
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

export type SideFolder = {
  type: FileType;
  directory: string;
  key: string;
  fileName: string;
};
export type FavoriteResponse = {
  favorites: SideFolder[];
};

export type SearchedUser = {
  iconURL: string;
  userId: string;
  username: string;
  email: string;
};
export type UserSearchResponse = {
  searchedUsers: SearchedUser[];
};
