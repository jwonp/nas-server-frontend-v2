import Image, { type StaticImageData } from "next/image";

type ControlButtonProps = {
  className?: string;
  icon: StaticImageData | string;
  onClick: () => void;
};
const ButtonIconSize = 20;
const ControlButton = ({ className, icon, onClick }: ControlButtonProps) => {
  return (
    <figure
      className={
        className ?? `my-auto w-7 h-7 lg:hover:bg-slate-500 rounded-full`
      }>
      <div
        className="m-1 w-5 h-5 "
        onClick={onClick}>
        <Image
          src={icon}
          alt=""
          width={ButtonIconSize}
          height={ButtonIconSize}
        />
      </div>
    </figure>
  );
};

export default ControlButton;
