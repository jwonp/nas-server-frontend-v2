import Image from "next/image";
import logoIcon from "@public/icons/logo.jpeg";
const Logo = () => {
  return (
    <div className="w-fit flex gap-4">
      <Image
        className="w-8 h-8 rounded-3xl"
        src={logoIcon}
        alt={""}
        width={32}
        height={32}
      />
      <div className="align-middle leading-8 text-white text-xl font-semibold font-['Inter']">
        Service Name
      </div>
    </div>
  );
};
export default Logo;
