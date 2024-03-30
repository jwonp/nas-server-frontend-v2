import { FileType, MetaData } from "./MetaData";
import { UserCredentials } from "./UserCredentials";
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
export type SideFolder = {
  type: FileType;
  directory: string;
  key: string;
  fileName: string;
};
export type SearchedUser = {
  iconURL: string;
  userId: string;
  username: string;
  email: string;
};
export type TemporaryAccount = Omit<UserCredentials, "password"> & {
  isRegisted: boolean;
  expireIn:number;
  accountCode:string;
  admin:string;
};
export type Size = {
  width:number;
  height:number;
}