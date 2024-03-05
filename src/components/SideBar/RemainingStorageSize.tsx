import { VolumeSize } from "@/types/Volume";
import { convertFileSize } from "@/utils/parseFileSize";
import { STORAGE_SIZE_LOADING } from "@/utils/strings";
import { useEffect, useState } from "react";
type RemainingStorageSizeProps = {
  isLoading: boolean;
  volume?: VolumeSize;
};
const RemainingStorageSize = ({
  isLoading,
  volume,
}: RemainingStorageSizeProps) => {
  const [now, setNow] = useState<number>(0);
  const [max, setMax] = useState<number>(1);

  useEffect(() => {
    setNow(() => volume?.now ?? 0);
    setMax(() => volume?.max ?? 1);
  }, [volume]);
  return (
    <div className="w-full mt-4">
      <div className="indent-2 text-white text-xl font-normal  font-['Inter']">
        저장용량
      </div>
      <div className="w-30 h-1  m-2  bg-white">
        <div
          className="bg-green-500 h-1"
          style={{
            width: `${Math.floor((now / max) * 100)}%`,
          }}></div>
      </div>
      {isLoading ? (
        <div>{STORAGE_SIZE_LOADING}</div>
      ) : (
        <article className="">
          <p className="indent-2 text-white text-base font-normal font-['Inter']">
            {`${convertFileSize(max)} 중 ${convertFileSize(now, true)} `}
          </p>
          <p className="indent-2 text-white text-base font-normal font-['Inter']">
            {`${max > 0 && `(${((now / max) * 100).toFixed(2)}%)`} 사용중 `}
          </p>
        </article>
      )}
    </div>
  );
};

export default RemainingStorageSize;
