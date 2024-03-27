import { useRef, useState, useEffect, SyntheticEvent } from "react";
import Image from "next/image";
import { Size } from "@/types/ComponentTypes";
import { useAppSelector } from "@/redux/hooks";

import { getNaturalImageSize, getResizedImageSize } from "@/utils/imageHandler";
import { useWindowSize } from "@uidotdev/usehooks";
type ImageViewProps = {
  src: string;
};

const ImageView = ({ src }: ImageViewProps) => {
  const $image = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const [naturalImageSize, setNaturalImageSize] = useState<Size>({
    width: 1,
    height: 1,
  });
  const [imageSize, setImageSize] = useState<Size>({
    width: 1,
    height: 1,
  });

  useEffect(() => {
    const resizedImageSize = getResizedImageSize(naturalImageSize, {
      width: windowSize.width ?? 1,
      height: windowSize.height ?? 1,
    });

    setImageSize(() => resizedImageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naturalImageSize, windowSize]);

  const onLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const naturalImageSize = getNaturalImageSize(e.target as HTMLImageElement);
    setNaturalImageSize(() => naturalImageSize);
  };
  // 6.980.262.272
  //6,980,262,272
  return (
    <div
      ref={$image}
      className="flex  w-full min-w-[308px] max-[1920px] h-screen p-0. relative">
      <figure className="mx-auto">
        <Image
          // style={{ width: "auto", height: "100%" }}
          onLoad={onLoad}
          src={src}
          alt={"NO IMAGE"}
          // fill
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // width={"0"}
          // height={"0"}
          width={imageSize.width}
          height={imageSize.height}
          priority={true}
        />
      </figure>
    </div>
  );
};

export default ImageView;
