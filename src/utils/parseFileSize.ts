const GB_DIVIDER = 1000 * 1000 * 1000;
const MB_DIVIDER = 1000 * 1000;
const KB_DIVIDER = 1000;
export const FileSizeUnit = {
  GB: "GB",
  MB: "MB",
  KB: "KB",
  BYTES: "BYTES",
};

export const convertFileSize = (byte: number): string => {

  const divided_byte = [
    { unit: FileSizeUnit.BYTES, size: byte },
    { unit: FileSizeUnit.KB, size: Math.floor(byte / KB_DIVIDER) },
    { unit: FileSizeUnit.MB, size: Math.floor(byte / MB_DIVIDER) },
    { unit: FileSizeUnit.GB, size: Number((byte / GB_DIVIDER).toFixed(2)) },
  ];

  let result = divided_byte[0];
  if(result.size === 0){
    return "-"
  }
  for (const item of divided_byte) {
    if (item.size < 1) break;
    result = item;
  }

  return `${result.size}${result.unit}`;
};
