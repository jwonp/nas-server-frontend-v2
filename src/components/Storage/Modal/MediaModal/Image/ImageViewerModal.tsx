import Image from "next/image";
import MediaModal from "../../common/MediaModal";
import { useAppSelector } from "@/redux/hooks";
import { getImageMedia } from "@/redux/featrues/mediaSlice";

const ImageViewerModal = () => {
  const imageMedia = useAppSelector(getImageMedia);

  return (
    <MediaModal isVisibleMedia={imageMedia.isVisible}>
      <p className="font-bold text-xl text-white">{imageMedia.title}</p>
      <div className="w-full h-full relative">
        <figure className="w-full h-auto p-0">
          <Image
            className="h-auto"
            src={imageMedia.src}
            alt={""}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </figure>
      </div>
    </MediaModal>
  );
};

export default ImageViewerModal;
