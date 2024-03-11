import { SHARE_NAVIGATOR_TEAM, SHARE_NAVIGATOR_USER } from "@/utils/strings";
import Link from "next/link";
type ShareNavigatorProps = {
  page: string;
};
const ShareNavigator = ({ page }: ShareNavigatorProps) => {
  const SELECTED = "w-full h-1 bg-white";
  return (
    <div className="grid grid-cols-2 border-b-2 border-white">
      <Link
        href={SHARE_NAVIGATOR_USER}
        className="col-span-1">
        <p className="w-full text-center text-xl">사용자</p>
        <figure
          className={`${
            page === SHARE_NAVIGATOR_USER ? SELECTED : ""
          }`}></figure>
      </Link>
      <Link
        href={SHARE_NAVIGATOR_TEAM}
        className="col-span-1">
        <p className="w-full text-center text-xl">팀</p>
        <figure
          className={`${
            page === SHARE_NAVIGATOR_TEAM ? SELECTED : ""
          }`}></figure>
      </Link>
    </div>
  );
};

export default ShareNavigator;
