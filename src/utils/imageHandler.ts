import { Size } from "@/types/ComponentTypes";


export const getWindowWidth = (mainWrapper: HTMLElement): number => {
  try {
    const paddingWidth =
      Number(
        window
          .getComputedStyle(mainWrapper, null)
          .getPropertyValue("padding")
          .split("px")[0]
      ) * 2;
    const paddingHeight =
      Number(
        window
          .getComputedStyle(mainWrapper, null)
          .getPropertyValue("padding")
          .split("px")[0]
      ) * 2;

    return mainWrapper.offsetWidth - paddingWidth;
  } catch {
    return 0;
  }
};
export const getNaturalImageSize = (img: HTMLImageElement): Size => {
  const size: Size = { width: img.naturalWidth, height: img.naturalHeight };
  return size;
};

export const getResizedImageSize = (
  naturalSize: Size,
  windowWidth: number
): Size => {
  if (naturalSize.width <= windowWidth) {
    return { width: naturalSize.width, height: naturalSize.height };
  }
  const rate = windowWidth / naturalSize.width;

  return { width: windowWidth, height: naturalSize.height * rate };
};

