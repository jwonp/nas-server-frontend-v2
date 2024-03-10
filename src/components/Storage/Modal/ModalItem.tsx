import Image from "next/image";
import UserCircleIcon from "@public/icons/userCircle.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ModalItemProps = {
  iconURL?: string;
  topText: string;
  bottomText: string;
};
const ModalItem = ({ iconURL, topText, bottomText }: ModalItemProps) => {
  const iconQuery = useQuery({
    queryKey: ["icon", { source: iconURL }],
    queryFn: (): Promise<{ url: string }> =>
      axios.get(`/api/storage/download?key=${iconURL}`).then((res) => res.data),
    enabled: iconURL ? true : false,
  });
  return (
    <article className="cursor-pointer flex gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 group-has-[:checked]:bg-slate-400 w-full min-w-[244px] h-14 p-2 mb-1">
      <figure className="min-w-[40px] min-h-[40px] rounded-full overflow-hidden ">
        <Image
          className="min-w-[40px] min-h-[40px] "
          src={iconQuery.data?.url ?? UserCircleIcon}
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
