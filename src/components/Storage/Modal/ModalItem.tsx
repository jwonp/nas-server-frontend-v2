import Image from "next/image";
import UserCircleIcon from "@public/icons/userCircle.png";

type ModalItemProps = {
  iconURL?: string;
  topText: string;
  bottomText: string;
};
const ModalItem = ({ iconURL, topText, bottomText }: ModalItemProps) => {
  return (
    <article className="cursor-pointer flex gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 w-full min-w-[244px] h-14 p-2 mb-1">
      <figure className="min-w-[40px] min-h-[40px]">
        <Image
          className="min-w-[40px] min-h-[40px]"
          src={iconURL ?? UserCircleIcon}
          alt={""}
          width={40}
          height={40}
        />
      </figure>
      <div>
        <p className="leading-5">{topText}</p>
        <p className="leading-5">{bottomText}</p>
      </div>
    </article>
  );
};

export default ModalItem;
