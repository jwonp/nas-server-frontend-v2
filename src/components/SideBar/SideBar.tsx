import RemainingStorageSize from "./RemainingStorageSize";
import SideListBar from "./SideListBar";
const SideBar = () => {
  return (
    <div className="w-full h-full left-0 top-56 py-4   border-zinc-100">
      <div className="indent-2  text-white text-xl font-semibold font-['Inter']">
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
      </div>
      <RemainingStorageSize />
    </div>
  );
};

export default SideBar;
