import { SideFolder } from "@/types/ComponentTypes";
import Link from "next/link";
import { useMemo } from "react";
import SideFolderBar from "./SideFolderBar";

type FavoriteFolderProps = {
  folders: SideFolder[];
};
const FavoriteFolder = ({ folders }: FavoriteFolderProps) => {
  const favoriteFolders = useMemo(() => {
    return folders.map((folder, index) => (
      <Link
        key={index}
        href={`/storage${folder.directory}/${
          folder.key.split("folder$", 2)[1]
        }`}>
        <SideFolderBar title={folder.fileName} />
      </Link>
    ));
  }, [folders]);
  return (
    <section>
      <div className="indent-2  text-white text-xl font-semibold font-['Inter']">
        즐겨찾기
      </div>
      <div className="max-h-60 overflow-scroll">
        <Link href={"/storage"}>
          <SideFolderBar title={"내 드라이브"} />
        </Link>
        {favoriteFolders}
      </div>
    </section>
  );
};
export default FavoriteFolder;
