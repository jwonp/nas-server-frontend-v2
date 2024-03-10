import Image from "next/image";
import folderIcon from "@public/icons/folder.png";
type SideFolderBarProps = {
  title: string;
};
const SideFolderBar = ({ title }: SideFolderBarProps) => {
  return (
    <div className="flex w-full h-12  p-2 select-none cursor-pointer">
      <Image
        src={folderIcon}
        alt={""}
        width={32}
        height={32}
      />
      <div className="px-2 leading-9 text-white text-l font-semibold font-['Inter']">
        {title}
      </div>
    </div>
  );
};

export default SideFolderBar;
