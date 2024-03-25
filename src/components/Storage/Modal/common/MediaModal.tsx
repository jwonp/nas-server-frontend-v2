import {
  getVisibleMediaModal,
  resetMediaModal,
} from "@/redux/featrues/mediaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import CancelIcon from "@public/icons/close-white.svg";

type MediaModalProps = {
  isVisibleMedia: boolean;
  children: React.ReactNode;
};

const MediaModal = ({ isVisibleMedia, children }: MediaModalProps) => {
  const dispatch = useAppDispatch();
  const isVisibleMediaModal = useAppSelector(getVisibleMediaModal);
  if (!(isVisibleMediaModal === true && isVisibleMedia === true)) {
    return (
      <div>{`isVisibleMediaModal ? ${isVisibleMediaModal} | isVisibleMedia ? ${isVisibleMedia}`}</div>
    );
  }
  return (
    <div className="fixed flex top-0 left-0 w-screen h-screen">
      <div className="fixed flex z-0 top-0 left-0 w-screen h-screen bg-slate-950 media-can-load:bg-emerald-400 media-can-play:bg-orange-500 opacity-45 " />
      <div className="my-auto w-full h-full px-10  z-40 relative">
        <figure
          className="flex cursor-pointer absolute right-0"
          onClick={() => {
            dispatch(resetMediaModal());
          }}>
          <Image
            className="ml-auto"
            src={CancelIcon}
            alt=""
            width={30}
            height={30}
          />
        </figure>
        {children}
      </div>
    </div>
  );
};
export default MediaModal;
