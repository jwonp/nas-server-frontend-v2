import RemainingStorageSize from "./RemainingStorageSize";
import SideListBar from "./SideListBar";
import { getVisibleSideBar } from "@/redux/featrues/sideBarVisibleSlice";
import { useAppSelector } from "@/redux/hooks";
import { VolumeSize } from "@/types/Volume";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const SideBar = () => {
  const isVisibleSidebar = useAppSelector(getVisibleSideBar);
  const { data: session } = useSession();
  const volumeQuery = useQuery({
    queryKey: ["volume"],
    queryFn: (): Promise<VolumeSize> =>
      axios.get("/api/user/volume").then((res) => res.data),
    enabled: session?.user.id ? true : false,
  });
  return (
    <aside
      className={`lg:col-span-1 lg:block lg:static ${
        isVisibleSidebar ? "fixed" : "hidden"
      } w-[240px] h-full bg-neutral-900`}>
      <div className="w-full h-full left-0 top-56 py-4   border-zinc-100">
        {/* <div className="indent-2  text-white text-xl font-semibold font-['Inter']">
        즐겨찾기
        </div>
        <div className="max-h-60 overflow-scroll">
        <SideListBar />
        <SideListBar />
        <SideListBar />
        <SideListBar />
        <SideListBar />
        <SideListBar />
        <SideListBar />
        <SideListBar />
        <SideListBar />
      </div> */}
        <RemainingStorageSize
          isLoading={volumeQuery.isLoading}
          volume={volumeQuery.data}
        />
      </div>
    </aside>
  );
};

export default SideBar;
