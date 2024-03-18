import Image from "next/image";
import logoIcon from "@public/icons/logo.png";
import Link from "next/link";
const Logo = () => {
  return (
    <Link
      href={"/storage"}
      className="w-fit flex gap-4">
      <Image
        className="max-mobile:hidden w-8 h-8 rounded-3xl"
        src={logoIcon}
        alt={""}
        width={32}
        height={32}
      />
      <div className=" align-middle leading-8 text-white text-xl font-semibold font-['Inter']">
        File cloud
      </div>
    </Link>
  );
};
export default Logo;
