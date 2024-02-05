import { VolumeSize } from "@/types/Volume";
import { convertFileSize } from "@/utils/parseFileSize";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const RemainingStorageSize = () => {
  const { data: session } = useSession();
  const [volume, setVolume] = useState<VolumeSize>({ max: -1, now: -1 });
  const volumeQuery = useQuery({
    queryKey: ["volume"],
    queryFn: (): Promise<VolumeSize> =>
      axios.get("/api/user/volume").then((res) => res.data),
    enabled: session?.user.id ? true : false,
  });
  useEffect(() => {
    if (volumeQuery && volumeQuery.data) {
      setVolume(() => volumeQuery.data);
    }
  }, [volumeQuery]);
  return (
    <div className="w-full mt-4">
      <div className="indent-2 text-white text-base font-normal font-['Inter']">
        {volume.max > 0 &&
          `저장용량 (${((volume.now / volume.max) * 100).toFixed(2)}% 사용중)`}
      </div>
      <div className="w-30 h-1  m-2  bg-white">
        <div
          className="bg-green-500 h-1"
          style={{
            width: `${Math.floor((volume.now / volume.max) * 100)}%`,
          }}></div>
      </div>
      <div className="indent-2 text-white text-base font-normal font-['Inter']">
        {`${convertFileSize(volume.max)} 중 ${convertFileSize(
          volume.now,
          true
        )} 사용중 `}
      </div>
    </div>
  );
};

export default RemainingStorageSize;
