import Image from "next/image";
import DarkCancelIcon from "@public/icons/close.svg";
import DeleteGroupIcon from "@public/icons/deleteUserGroup.png";
import addGroupIcon from "@public/icons/addUserGroup.png";
import UserGroupIcon from "@public/icons/userGroup.png";
import ShareNavigator from "@/components/Share/ShareNavigator";

export const TeamShareList = () => {
  const [searchTeamQuery, setTeamQuery] = useState<string>("");
  return (
    <section className="max-w-[1440px] w-full mx-auto p-4">
      <header className="w-1/3 mb-4">
        <ShareNavigator />
      </header>

      <nav>
        <article className="w-full mb-2 h-10 relative">
          <input
            //   ref={$searchInput}
            className="w-full py-2 px-3 rounded-lg text-stone-950 h-full"
            type="text"
            placeholder="팀명 또는 팀에 소속된 사용자의 이메일이나 전화번호로 검색"
          />
          <button className="absolute top-1 right-2">
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
        <article className="cursor-pointer flex gap-2 w-full min-w-[244px] h-14 p-2 border-b-2 border-white">
          <figure className="min-w-[40px] min-h-[40px] rounded-full overflow-hidden">
            <Image
              className="min-w-[40px] min-h-[40px] overflow-hidden"
              src={addGroupIcon}
              alt={""}
              width={40}
              height={40}
            />
          </figure>
          <div>
            <p className="leading-10">{"박주원"}</p>
          </div>
        </article>
        <article className="cursor-pointer flex justify-between w-full min-w-[244px] h-14 p-2 border-b-2 border-white">
          <div className="flex gap-2">
            <figure className="min-w-[40px] min-h-[40px] rounded-full overflow-hidden ">
              <Image
                className="min-w-[40px] min-h-[40px] "
                src={UserGroupIcon}
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
                className="min-w-[36px] min-h-[36px] p-1"
                src={DeleteGroupIcon}
                alt={""}
                width={36}
                height={36}
              />
            </figure>
          </div>
        </article>

        <article className="cursor-pointer flex gap-2 w-full min-w-[244px] h-14 p-2 border-b-2 border-white">
          <figure className="min-w-[40px] min-h-[40px] rounded-full overflow-hidden ">
            <Image
              className="min-w-[40px] min-h-[40px] "
              src={UserGroupIcon}
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
