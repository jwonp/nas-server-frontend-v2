import Image from "next/image";
import UserCircleIcon from "@public/icons/userCircle.png";
import RegistedIcon from "@public/icons/userCheckd-white.svg";
import NotRegistedIcon from "@public/icons/deleteUser.png";
import DeleteIcon from "@public/icons/delete.png";
import ShareIcon from "@public/icons/share.png";
import CheckedIcon from "@public/icons/checked-white.svg";
import type { TemporaryAccount } from "@/types/ComponentTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTimeString } from "@/utils/parseTime";
import { getPhoneString } from "@/utils/parsePhone";
import { useState } from "react";

type TemporaryAccountListBarProps = {
  account: TemporaryAccount;
};
const TemporaryAccountListBar = ({ account }: TemporaryAccountListBarProps) => {
  const [isVisibieCopyToast, setVisibieCopyToast] = useState<boolean>(false);
  const iconQuery = useQuery({
    queryKey: ["icon", { source: account.icon }],
    queryFn: (): Promise<{ url: string }> =>
      axios
        .get(`/api/storage/download?key=${account.icon}`)
        .then((res) => res.data),
    enabled: account.icon ? true : false,
  });

  const handleClickShareButton = () => {
    window.navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/?code=${encodeURIComponent(account.accountCode)}`);
    setVisibieCopyToast(() => true);
    setTimeout(() => {
      setVisibieCopyToast(() => false);
    }, 700);
  };
  
  return (
    <div className="grid grid-cols-8 w-full h-14 py-1 border-b-2 border-white">
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
      <div className="col-span-1 flex ml-auto px-3 py-2">
        <figure className=" rounded-full overflow-hidden max-h-8 h-8 w-8 ">
          <Image
            className="mx-auto"
            src={account.isRegisted ? RegistedIcon : NotRegistedIcon}
            alt={""}
            width={32}
            height={32}
          />
        </figure>
      </div>
      <div className="col-span-1 flex ml-auto px-3 py-2 relative">
        <div className={`${isVisibieCopyToast ? "block" : "hidden"}`}>
          <div className="absolute flex -bottom-4 -left-9 bg-green-600 px-2 py-1 rounded-lg">
            <figure className=" rounded-full overflow-hidden max-h-6 h-6 w-6">
              <Image
                className="mx-auto"
                src={CheckedIcon}
                alt={""}
                width={24}
                height={24}
              />
            </figure>
            <p className="leading-6">copied</p>
          </div>
        </div>
        <figure
          className="hover:bg-slate-500 rounded-full overflow-hidden max-h-8 h-8 w-8 p-1 "
          onClick={handleClickShareButton}>
          <Image
            className="mx-auto"
            src={ShareIcon}
            alt={""}
            width={32}
            height={32}
          />
        </figure>
        <figure className="hover:bg-slate-500 rounded-full overflow-hidden max-h-8 h-8 w-8 p-1 ">
          <Image
            className="mx-auto"
            src={DeleteIcon}
            alt={""}
            width={32}
            height={32}
          />
        </figure>
      </div>
    </div>
  );
};

export default TemporaryAccountListBar;
