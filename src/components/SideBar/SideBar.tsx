import RemainingStorageSize from "./RemainingStorageSize";

import { getVisibleSideBar } from "@/redux/featrues/sideBarVisibleSlice";
import { useAppSelector } from "@/redux/hooks";
import { FavoriteResponse } from "@/types/Responses";
import { VolumeSize } from "@/types/Volume";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import FavoriteFolder from "./FavoriteFolder";
import Link from "next/link";
import AddUserIcon from "@public/icons/addUser-white.svg";
import Image from "next/image";
const SideBar = () => {
  const isVisibleSidebar = useAppSelector(getVisibleSideBar);
  const { data: session } = useSession();
  const favoriteQuery = useQuery({
    queryKey: ["favorite", session?.user.id],
    queryFn: (): Promise<FavoriteResponse> =>
      axios.get("/api/storage/favorite").then((res) => res.data),
    enabled: session?.user.id ? true : false,
  });
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
        <section>
          <FavoriteFolder folders={favoriteQuery.data?.favorites ?? []} />
        </section>
        <section>
          <RemainingStorageSize
            isLoading={volumeQuery.isLoading}
            volume={volumeQuery.data}
          />
        </section>
        <section>
          <Link href="/share/user">
            <div className="flex rounded-lg w-3/4 text-center border-2 p-2 mx-auto my-2 ">
              <div className="flex mx-2 gap-2">
                <figure>
                  <Image
                    src={AddUserIcon}
                    alt=""
                    width={24}
                    height={24}
                  />
                </figure>
                <p>공유 대상 관리</p>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </aside>
  );
};

export default SideBar;
