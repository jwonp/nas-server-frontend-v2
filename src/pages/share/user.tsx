import Image from "next/image";
import DarkCancelIcon from "@public/icons/close.svg";
import UserCircleIcon from "@public/icons/userCircle.png";
import DeleteUserIcon from "@public/icons/deleteUser.png";
import RejectRequestIcon from "@public/icons/close-white.svg";
import AcceptRequestIcon from "@public/icons/checked-white.svg";
import ShareNavigator from "@/components/Share/ShareNavigator";
import { useRouter } from "next/router";
const UserShareList = () => {
  const router = useRouter();
  return (
    <section className="max-w-[1440px] w-full mx-auto p-4">
      <header className="w-1/3 mb-4">
        <ShareNavigator page={router.pathname} />
      </header>

      <nav>
        <article className="w-full mb-2 h-10 relative">
          <input
            //   ref={$searchInput}
            className="w-full py-2 px-3 rounded-lg text-stone-950 h-full"
            type="text"
            placeholder="공유할 사용자의 이메일 또는 전화번호로 검색"
            //   onChange={handleChangeQuery}
          />
          <button
            className="absolute top-1 right-2"
            //   onClick={handleClickToClearSearchQuery}
          >
            <div className="cursor-pointer ml-auto py-1 min-w-[24px] min-h-[24px]">
              <Image
                className="hover:bg-slate-200 rounded-full p-1 min-w-[24px] min-h-[24px]"
                src={DarkCancelIcon}
                alt={""}
                width={24}
                height={24}
              />
            </div>
          </button>
        </article>
      </nav>

      <main>
        <article className="cursor-pointer flex justify-between w-full min-w-[244px] h-14 p-2 border-b-2 border-white">
          <div className="flex gap-2">
            <figure className="min-w-[40px] min-h-[40px] rounded-full overflow-hidden ">
              <Image
                className="min-w-[40px] min-h-[40px] "
                src={UserCircleIcon}
                alt={""}
                width={40}
                height={40}
              />
            </figure>
            <div>
              <p className="leading-5">{"박주원"}</p>
              <p className="leading-5">{"tkdel222@gmail.com"}</p>
            </div>
          </div>
          <div className="px-2 flex gap-2">
            <figure className="hover:bg-slate-400 rounded-full overflow-hidden">
              <Image
                className="min-w-[32px] min-h-[32px] p-1"
                src={AcceptRequestIcon}
                alt={""}
                width={32}
                height={32}
              />
            </figure>
            <figure className="hover:bg-slate-400 rounded-full overflow-hidden">
              <Image
                className="min-w-[32px] min-h-[32px] p-1"
                src={RejectRequestIcon}
                alt={""}
                width={34}
                height={34}
              />
            </figure>
          </div>
        </article>
        <article className="cursor-pointer flex justify-between w-full min-w-[244px] h-14 p-2 border-b-2 border-white">
          <div className="flex gap-2">
            <figure className="min-w-[40px] min-h-[40px] rounded-full overflow-hidden ">
              <Image
                className="min-w-[40px] min-h-[40px] "
                src={UserCircleIcon}
                alt={""}
                width={40}
                height={40}
              />
            </figure>
            <div>
              <p className="leading-5">{"박주원"}</p>
              <p className="leading-5">{"tkdel222@gmail.com"}</p>
            </div>
          </div>
          <div className="px-2">
            <figure className="hover:bg-slate-400 rounded-full overflow-hidden">
              <Image
                className="min-w-[32px] min-h-[32px] p-1"
                src={DeleteUserIcon}
                alt={""}
                width={34}
                height={34}
              />
            </figure>
          </div>
        </article>
        <article className="cursor-pointer flex gap-2 w-full min-w-[244px] h-14 p-2 border-b-2 border-white">
          <figure className="min-w-[40px] min-h-[40px] rounded-full overflow-hidden ">
            <Image
              className="min-w-[40px] min-h-[40px] "
              src={UserCircleIcon}
              alt={""}
              width={40}
              height={40}
            />
          </figure>
          <div>
            <p className="leading-5">{"박주원"}</p>
            <p className="leading-5">{"tkdel222@gmail.com"}</p>
          </div>
        </article>
      </main>
    </section>
  );
};
export default UserShareList;
