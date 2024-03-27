import MediaModal from "../../common/MediaModal";
import { useAppSelector } from "@/redux/hooks";
import { getImageMedia } from "@/redux/featrues/mediaSlice";
import ImageView from "./ImageView";

const ImageViewerModal = () => {
  const imageMedia = useAppSelector(getImageMedia);

  return (
    <MediaModal isVisibleMedia={imageMedia.isVisible}>
      <div className="w-full h-auto">
        <p className="text-center font-bold text-xl my-6 text-white">{imageMedia.title}</p>
        <ImageView src={imageMedia.src} />
      </div>
    </MediaModal>
  );
};

export default ImageViewerModal;
