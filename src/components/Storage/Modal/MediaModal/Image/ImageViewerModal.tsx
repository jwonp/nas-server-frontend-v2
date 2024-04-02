import MediaModal from "../../common/MediaModal";
import { useAppSelector } from "@/redux/hooks";
import { getImageMedia } from "@/redux/featrues/mediaSlice";
import ImageView from "./ImageView";

const ImageViewerModal = () => {
  const imageMedia = useAppSelector(getImageMedia);

  return (
    <MediaModal isVisibleMedia={imageMedia.isVisible}>
      <div className="w-full h-auto">
        <div className="flex w-full  rounded-sm">
          <p className="text-center font-bold text-xl my-0 mx-auto px-10 text-white ">
            {imageMedia.title}
          </p>
        </div>
        <figure>
          <ImageView src={imageMedia.src} />
        </figure>
      </div>
    </MediaModal>
  );
};

export default ImageViewerModal;
