import Image from "next/image";
import logoutIcon from "@public/icons/logout.png";
import Logo from "./Logo";
const Header = () => {
  
  return (
    <div className="flex justify-between  w-screen h-14 p-3  border-b border-zinc-100">
      <Logo />
      <div className="flex gap-6">
        <div className="align-middle leading-8  text-white text-lg font-semibold font-['Inter']">
          유저 이름
        </div>

        <div className="flex w-32 h-7 gap-2">
          <Image
            className="w-7 h-7"
            src={logoutIcon}
            alt={""}
            width={28}
            height={28}
          />
          <div className="align-middle leading-8  text-center text-white text-lg font-semibold font-['Inter']">
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
