import {
  DisplayHistory,
  Item,
  SearchedUser,
  SideFolder,
  TemporaryAccount,
} from "./ComponentTypes";
import { FileType, MetaData } from "./MetaData";

import { VolumeSize } from "./Volume";

export interface BasicResponse {
  status: number;
}
export interface Error {
  body: { msg: string };
}
export interface Success<T = any> {
  body: T;
}
export interface ErrorResponse extends BasicResponse, Error {}
export interface SuccessResponse<T = any> extends BasicResponse, Success<T> {}

export type ItemResponse = {
  histories: DisplayHistory[];
  items: Item;
};
export type MetaUploadResponse = {
  meta: MetaData[];
  volume: VolumeSize;
};

export type FavoriteResponse = {
  favorites: SideFolder[];
};

export type UserSearchResponse = {
  searchedUsers: SearchedUser[];
};

export type AdminCheckResponse = {
  isAdmin: boolean;
};

export type TemporaryAccountPostResponse = {
  accountCode: string;
};
export type TemporaryAccountResponse = {
  accounts: TemporaryAccount[];
};

export type TempMetaResponse = {
  tempMetas: (MetaData & { id: string })[];
};
