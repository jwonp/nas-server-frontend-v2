import Image from "next/image";
import UserCircleIcon from "@public/icons/userCircle.png";
import CancelIcon from "@public/icons/close-white.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
type SelectedModalItemProps = {
  iconURL?: string;
  text: string;
};
const SelectedModalItem = ({ iconURL, text }: SelectedModalItemProps) => {
  const iconQuery = useQuery({
    queryKey: ["icon", { source: iconURL }],
    queryFn: (): Promise<{ url: string }> =>
      axios.get(`/api/storage/download?key=${iconURL}`).then((res) => res.data),
    enabled: iconURL ? true : false,
    refetchInterval:false
  });
  return (
    <article className="flex gap-2 snap-center rounded-full bg-slate-800 min-w-[240px]  h-10 mb-1 py-1 px-2">
      <figure className="min-w-[32px] min-h-[32px] rounded-full overflow-hidden ">
        <Image
          className="min-w-[32px] min-h-[32px]"
          src={iconQuery.data?.url ?? UserCircleIcon}
          alt={""}
          width={32}
          height={32}
        />
      </figure>
      <p className="leading-8">{text}</p>
      {/* <div className="cursor-pointer ml-auto py-1 min-w-[24px] min-h-[24px]">
        <Image
          className="hover:bg-slate-600 rounded-full p-1 min-w-[24px] min-h-[24px]"
          src={CancelIcon}
          alt={""}
          width={24}
          height={24}
        />
      </div> */}
    </article>
  );
};

export default SelectedModalItem;
