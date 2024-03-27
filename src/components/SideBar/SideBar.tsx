import RemainingStorageSize from "./RemainingStorageSize";
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
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: "always",
    retry: 5,
    refetchInterval: false,
  });

  return (
    <aside
      className={`lg:col-span-1 lg:block lg:static ${
        isVisibleSidebar ? "fixed" : "hidden"
      } w-[240px] h-full bg-neutral-900`}>
      <div className="w-full h-full left-0 top-56 py-4   border-zinc-100">
        <section>
          <RemainingStorageSize
            isLoading={volumeQuery.isLoading}
            volume={volumeQuery.data}
          />
        </section>
      </div>
    </aside>
  );
};

export default SideBar;
