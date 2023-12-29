import Image from "next/image";
import folderIcon from "@public/icons/folder.png";
const SideListBar = () => {
    
  return (
    <div className="flex w-full h-12  p-2 select-none cursor-pointer">
      <Image
        src={folderIcon}
        alt={""}
        width={32}
        height={32}
      />
      <div className="px-2 leading-9 text-white text-l font-semibold font-['Inter']">
        폴더 제목
      </div>
    </div>
  );
};

export default SideListBar;
