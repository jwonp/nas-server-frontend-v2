import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Size } from "@/types/ComponentTypes";
import { useAppSelector } from "@/redux/hooks";
import { getWidth } from "@/redux/featrues/windowWidthSlice";
import { getNaturalImageSize, getResizedImageSize } from "@/utils/imageHandler";
type ImageViewProps = {
  src: string;
};

const ImageView = ({ src }: ImageViewProps) => {
  const $image = useRef<HTMLDivElement>(null);
  const windowWidth = useAppSelector(getWidth);
  const [naturalImageSize, setNaturalImageSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const [imageSize, setImageSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resizedImageSize = getResizedImageSize(
      naturalImageSize,
      $image.current?.offsetWidth ?? 0
    );

    setImageSize(resizedImageSize);
  }, [src, windowWidth, naturalImageSize]);

  const onLoadingCompleteHandler = (img: HTMLImageElement) => {
    const naturalImageSize = getNaturalImageSize(img);
    setNaturalImageSize(naturalImageSize);
  };
  return (
    <div
      ref={$image}
      className="w-full min-w-[308px] max-[1920px] h-auto p-0">
      <Image
        // className="h-auto"
        onLoadingComplete={onLoadingCompleteHandler}
        src={src}
        alt={"NO IMAGE"}
        width={imageSize.width}
        height={imageSize.height}
        unoptimized={true}
        priority={true}
      />
    </div>
  );
};

export default ImageView;
