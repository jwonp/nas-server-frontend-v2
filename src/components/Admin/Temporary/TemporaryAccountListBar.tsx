import Image from "next/image";
import UserCircleIcon from "@public/icons/userCircle.png";
import RegistedIcon from "@public/icons/userCheckd-white.svg";
import NotRegistedIcon from "@public/icons/deleteUser.png";
import DeleteIcon from "@public/icons/delete.png";
import type { TemporaryAccount } from "@/types/ComponentTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTimeString } from "@/utils/parseTime";
import { getPhoneString } from "@/utils/parsePhone";

type TemporaryAccountListBarProps = {
  account: TemporaryAccount;
};
const TemporaryAccountListBar = ({ account }: TemporaryAccountListBarProps) => {
  const iconQuery = useQuery({
    queryKey: ["icon", { source: account.icon }],
    queryFn: (): Promise<{ url: string }> =>
      axios
        .get(`/api/storage/download?key=${account.icon}`)
        .then((res) => res.data),
    enabled: account.icon ? true : false,
  });
  const handleClickListBar = (e: React.MouseEvent<HTMLDivElement>) => {
    window.navigator.clipboard.writeText(account.accountCode);
  };
  return (
    <div
      className="grid grid-cols-8 w-full h-14 py-1 border-b-2 border-white"
      onClick={handleClickListBar}>
      <div className="col-span-2 flex gap-2 p-2">
        <figure className=" rounded-full overflow-hidden max-h-8 h-8 w-8 ">
          <Image
            className="mx-auto"
            src={iconQuery.data?.url ?? UserCircleIcon}
            alt={""}
            width={32}
            height={32}
          />
        </figure>
        <p className=" text-white leading-8">{account.name}</p>
      </div>
      <div className="col-span-2">
        <p className=" text-white ">{account.username}</p>
        <p className=" text-white ">{getPhoneString(account.phone)}</p>
      </div>
      <div className="col-span-2">
        <p className=" px-3 text-white text-end ">{`by ${account.admin}`}</p>
        <p className=" px-3 text-white text-end ">
          {`expire in ${getTimeString(account.expireIn)}`}
        </p>
      </div>
      <div className="col-span-1 flex">
        <p className="ml-auto px-3 py-2 text-white text-end ">
          <figure className=" rounded-full overflow-hidden max-h-8 h-8 w-8 ">
            <Image
              className="mx-auto"
              src={account.isRegisted ? RegistedIcon : NotRegistedIcon}
              alt={""}
              width={32}
              height={32}
            />
          </figure>
        </p>
      </div>
      <div className="col-span-1 flex">
        <p className="ml-auto px-3 py-2 text-white text-end ">
          <figure className="hover:bg-slate-500 rounded-full overflow-hidden max-h-8 h-8 w-8 p-1 ">
            <Image
              className="mx-auto"
              src={DeleteIcon}
              alt={""}
              width={32}
              height={32}
            />
          </figure>
        </p>
      </div>
    </div>
  );
};

export default TemporaryAccountListBar;
