import Image from "next/image";
import WhiteCloseIcon from "@public/icons/close-white.svg";
import {
  getWarningSnackBar,
  resetWarningSnackBar,
} from "@/redux/featrues/snackBarSwitchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
const WarningSnackBar = () => {
  const dispatch = useAppDispatch();
  const warningSnackBar = useAppSelector(getWarningSnackBar);
  return (
    <div className={` ${warningSnackBar.isVisible === false && "hidden"}`}>
      <div className="flex gap-4 fixed bottom-[10px] right-[15px] text-white  h-[50px] py-[7px] px-4 leading-8 border-rose-800 border-2 bg-red-500 rounded-lg">
        <div>{warningSnackBar.message}</div>
        <div
          className="cursor-pointer float-right py-[7px]"
          onClick={() => {
            dispatch(resetWarningSnackBar());
          }}>
          <Image
            src={WhiteCloseIcon}
            alt={""}
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>
  );
};
export default WarningSnackBar;
