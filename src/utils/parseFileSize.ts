const GB_DIVIDER = 1000 * 1000 * 1000;
const MB_DIVIDER = 1000 * 1000;
const KB_DIVIDER = 1000;
export const FileSizeUnit = {
  GB: "GB",
  MB: "MB",
  KB: "KB",
  BYTE: "BYTE",
};

export const convertFileSize = (byte: number,isReturnZeroByte?:boolean): string => {

  const divided_byte = [
    { unit: FileSizeUnit.BYTE, size: byte },
    { unit: FileSizeUnit.KB, size: Math.floor(byte / KB_DIVIDER) },
    { unit: FileSizeUnit.MB, size: Math.floor(byte / MB_DIVIDER) },
    { unit: FileSizeUnit.GB, size: Number((byte / GB_DIVIDER).toFixed(2)) },
  ];

  let result = divided_byte[0];
  if(result.size === 0){
    return isReturnZeroByte ? "0BYTE" : "-"
  }
  for (const item of divided_byte) {
    if (item.size < 1) break;
    result = item;
  }

  return `${result.size}${result.unit}`;
};
