import Image from "next/image";
import logoutIcon from "@public/icons/logout.png";
import loginIcon from "@public/icons/login.png";
import MenuIcon from "@public/icons/menu.png";
import UserIcon from "@public/icons/userCircle.png";
import Logo from "./Logo";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getVisibleSideBar,
  setVisibleSideBar,
} from "@/redux/featrues/sideBarVisibleSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Header = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const isVisibleSidebar = useAppSelector(getVisibleSideBar);
  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setVisibleSideBar(!isVisibleSidebar));
  };
  const handleLoginOutClick = session ? () => signOut() : () => signIn();

  const { data, error, isLoading } = useQuery({
    queryKey: ["profileIcon"],
    queryFn: (): Promise<{ url: string }> =>
      axios
        .get(`/api/download?key=${session?.user.image}`)
        .then((response) => response.data),
    enabled: session?.user.image ? true : false,
  });
  const userIcon = useMemo(() => {
    if (isLoading && !data) {
      return UserIcon;
    }
    if (data && data.url) {
      return data.url;
    }
    return UserIcon;
  }, [data, isLoading]);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-3  w-screen h-14 p-3  border-b border-zinc-100 select-none">
      <div
        className="lg:hidden cursor-pointer"
        onClick={handleMenuClick}>
        <Image
          src={MenuIcon}
          alt={""}
          width={28}
          height={28}
        />
      </div>
      <div className="lg:m-0 mx-auto">
        <Logo />
      </div>
      <div className="ml-auto">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex">
            <div className="cursor-pointer rounded-full overflow-hidden max-h-8 h-8 w-8 relative">
              <Image
                src={userIcon}
                alt={""}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="ml-auto align-middle leading-8  text-white text-lg font-semibold font-['Inter']">
              {session?.user?.name ?? ""}
            </div>
          </div>

          <div
            className="flex cursor-pointer"
            onClick={handleLoginOutClick}>
            <div className="ml-auto">
              <div className="flex gap-1">
                <div className="flex">
                  <div className="my-auto">
                    <Image
                      className="w-7 h-7"
                      src={session ? logoutIcon : loginIcon}
                      alt={""}
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
                <div className="align-middle leading-8  text-center text-white text-lg font-semibold font-['Inter']">
                  {`${session ? "로그아웃" : "로그인"}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
