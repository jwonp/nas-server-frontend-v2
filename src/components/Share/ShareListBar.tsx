import UserCircleIcon from "@public/icons/userCircle.png";
import DeleteUserIcon from "@public/icons/deleteUser.png";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { SearchedUser } from "@/types/Responses";
type ShareListBarButton = {
  src: string | StaticImport;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
type ShareListBarProps = {
  user: SearchedUser;
  buttons: ShareListBarButton[];
};
const ShareListBar = ({ user, buttons }: ShareListBarProps) => {
  const controlButtons = buttons?.map((button, index) => (
    <button
      key={`button-${index}`}
      className="px-2 my-auto"
      onClick={button.onClick}>
      <figure className="hover:bg-slate-400 rounded-full overflow-hidden">
        <Image
          className="min-w-[32px] min-h-[32px] p-1"
          src={button.src}
          alt={""}
          width={33}
          height={33}
        />
      </figure>
    </button>
  )) ?? [<></>];
  return (
    <article className="cursor-pointer flex justify-between w-full min-w-[244px] h-14 p-2 border-b-2 border-white">
      <div className="flex gap-2">
        <figure className="min-w-[40px] min-h-[40px] rounded-full overflow-hidden ">
          <Image
            className="min-w-[40px] min-h-[40px] "
            src={user?.iconURL ?? UserCircleIcon}
            alt={""}
            width={40}
            height={40}
          />
        </figure>
        <div>
          <p className="leading-5">{user?.username}</p>
          <p className="leading-5">{user?.email}</p>
        </div>
      </div>
      <div className="flex gap-2">{controlButtons}</div>
    </article>
  );
};

export default ShareListBar;
