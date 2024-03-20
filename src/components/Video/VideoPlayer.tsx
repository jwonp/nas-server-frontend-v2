import "@vidstack/react/player/styles/base.css";
import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
} from "@vidstack/react";
// import { Poster } from "@vidstack/react";
// import { PlayIcon } from "@vidstack/react/icons";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getVideoMedia, resetVideoMedia } from "@/redux/featrues/mediaSlice";
import Image from "next/image";
import CancelIcon from "@public/icons/close-white.svg";
const VideoPlayer = () => {
  const dispatch = useAppDispatch();
  const player = useRef<MediaPlayerInstance>(null);
  const videoMedia = useAppSelector(getVideoMedia);

  if (videoMedia.isVisible === false) {
    return <div></div>;
  }
  return (
    <div className="fixed flex top-0 left-0 w-screen h-screen">
      <div className="fixed flex z-0 top-0 left-0 w-screen h-screen bg-slate-950 opacity-45" />
      <div className="my-auto mx-10  z-40">
        <figure
          className="flex cursor-pointer"
          onClick={() => {
            console.log("cli");
            dispatch(resetVideoMedia());
          }}>
          <Image
            className="ml-auto"
            src={CancelIcon}
            alt=""
            width={30}
            height={30}
          />
        </figure>
        <MediaPlayer
          ref={player}
          playsInline
          aspectRatio="16/9"
          load="visible"
          posterLoad="visible"
          streamType="on-demand"
          title={videoMedia.title}
          controls
          autoPlay
          src={videoMedia.src}>
          <MediaProvider className="media-can-load:w-full">
            {/* <Poster
          className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src="https://media-files.vidstack.io/sprite-fight/poster.webp"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        /> */}
            {/* <PlayIcon size={40} /> */}
          </MediaProvider>
        </MediaPlayer>
      </div>
    </div>
  );
};
export default VideoPlayer;
