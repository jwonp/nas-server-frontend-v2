import "@vidstack/react/player/styles/base.css";
import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
} from "@vidstack/react";
// import { Poster } from "@vidstack/react";
// import { PlayIcon } from "@vidstack/react/icons";
import { useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { getVideoMedia } from "@/redux/featrues/mediaSlice";
import MediaModal from "../../common/MediaModal";
const VideoPlayerModal = () => {
  const player = useRef<MediaPlayerInstance>(null);
  const videoMedia = useAppSelector(getVideoMedia);

  return (
    <MediaModal isVisibleMedia={videoMedia.isVisible}>
      <MediaPlayer
        ref={player}
        playsInline
        aspectRatio="16/9"
        load="idle"
        posterLoad="visible"
        streamType="on-demand"
        title={videoMedia.title}
        controls
        autoPlay
        src={videoMedia.src}>
        <MediaProvider>
          {/* <Poster
          className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src="https://media-files.vidstack.io/sprite-fight/poster.webp"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        /> */}
          {/* <PlayIcon size={40} /> */}
        </MediaProvider>
      </MediaPlayer>
    </MediaModal>
  );
};
export default VideoPlayerModal;
