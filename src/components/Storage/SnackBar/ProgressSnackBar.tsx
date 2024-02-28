import {
  getFileAmount,
  getProgressPercent,
} from "@/redux/featrues/fileLoadProgressSlice";
import {  useAppSelector } from "@/redux/hooks";
const ProgressSnackBar = () => {
  const fileAmount = useAppSelector(getFileAmount);
  const progressPercent = useAppSelector(getProgressPercent);
  return (
    <div className={`${fileAmount.fileTotalAmount < 0 && "hidden"}`}>
      <div className="fixed bottom-[10px] right-[15px] text-white w-[300px] h-[50px] py-[7px] px-4 leading-9 bg-slate-500 rounded-lg">
        {`${fileAmount.fileCurrentAmount}/${fileAmount.fileTotalAmount}번쨰 ${progressPercent}% 진행중`}
      </div>
    </div>
  );
};
export default ProgressSnackBar;
