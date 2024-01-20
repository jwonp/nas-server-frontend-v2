import { FileType, fileTypes } from "@/types/MetaData";

export const getFileType = (fileType: string):FileType => {
  const rowType = fileType.split("/")[0];
  
  if (rowType === fileTypes.image || rowType === fileTypes.video) {
    return rowType as FileType;
  }
  return "file";
};
