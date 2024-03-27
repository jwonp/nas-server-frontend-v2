import { Size } from "@/types/ComponentTypes";

export const getNaturalImageSize = (img: HTMLImageElement): Size => {
  const size: Size = { width: img.naturalWidth, height: img.naturalHeight };
  return size;
};

export const getResizedImageSize = (
  naturalSize: Size,
  windowSize: Size
): Size => {
  const naturalWidth = naturalSize.width;
  const naturalHeight = naturalSize.height;
  const windowWidth = windowSize.width;
  const windowHeight = windowSize.height;
  console.log(naturalWidth, naturalHeight, windowWidth, windowHeight);
  if (
    naturalSize.width >= naturalSize.height &&
    windowSize.width < windowSize.height
  ) {
    const ratio = Math.floor(windowWidth / naturalWidth);
    console.log(ratio);
    const imgSize: Size = {
      width: naturalWidth * ratio,
      height: naturalHeight * ratio,
    };
    return imgSize;
  }

  const ratio = Math.floor(windowHeight / naturalHeight);
  console.log(ratio);
  const imgSize: Size = {
    width: naturalWidth * ratio,
    height: naturalHeight * ratio,
  };
  return imgSize;
};
