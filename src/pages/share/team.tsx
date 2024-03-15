import Image from "next/image";
import DarkCancelIcon from "@public/icons/close.svg";
import DeleteGroupIcon from "@public/icons/deleteUserGroup.png";
import ExitGroupIcon from "@public/icons/logout.png";
import addGroupIcon from "@public/icons/addUserGroup.png";
import UserGroupIcon from "@public/icons/userGroup.png";
import ShareNavigator from "@/components/Share/ShareNavigator";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
const TeamShareList = () => {
  const router = useRouter();
  const [searchTeamQuery, setTeamQuery] = useState<string>("");
  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamQuery(() => e.target.value);
  };
  return (
    <section className="max-w-[1440px] w-full mx-auto p-4">
      <header className="w-full mb-4">
        <section className="w-full px-10 py-4 bg-slate-600 rounded-lg mb-4">
          <ul className="list-outside list-disc">
            <li>
              <p className="text-lg">
                {`새로운 팀을 생성하려면 입력창에 팀 이름을 입력하신 후에, 입력창 아래 "[사용자 지정 팀 이름]으로 팀 생성" 을 선택해주세요.`}
              </p>
            </li>
            <li>
              <p className="text-lg">
                {`다른 팀에 들어가는 것은 횟수 제한이 없지만, 생성할 수 있는 팀의 갯수를 제한되어 있습니다.`}
              </p>
            </li>
            <li>
              <p className="text-lg">
                {`다른 팀의 초대 코드를 입력하면 초대한 팀을 확인할 수 있습니다.`}
              </p>
            </li>
          </ul>
        </section>

        <section className="w-1/3 mb-4">
          <ShareNavigator page={router.pathname} />
        </section>
      </header>

      <nav>
        <article className="w-full mb-2 h-10 relative">
          <input
            //   ref={$searchInput}
            className="w-full py-2 px-3 rounded-lg text-stone-950 h-full"
            type="text"
            placeholder="팀 생성 및 검색"
            onChange={handleChangeQuery}
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
        {searchTeamQuery.length > 0 && (
          <button className="cursor-pointer flex gap-2 w-full min-w-[244px] h-14 p-2 border-b-2 border-white">
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
              <p className="leading-10">{`"${searchTeamQuery}"으로 새로운 팀 생성 (1/5)`}</p>
            </div>
          </button>
        )}
        <article className="col-span-4 w-full min-w-[244px] h-14 p-2  border-white">
          <div>
            <p className="leading-10 text-xl">
              {"소속되어 있는 팀이 없습니다."}
            </p>
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
          <div className="px-2 flex gap-2">
            <figure className="hover:bg-slate-400 rounded-full overflow-hidden">
              <Image
                className="min-w-[36px] min-h-[36px] p-1"
                src={DeleteGroupIcon}
                alt={""}
                width={36}
                height={36}
              />
            </figure>
            <figure className="hover:bg-slate-400 rounded-full overflow-hidden">
              <Image
                className="min-w-[36px] min-h-[36px] p-1"
                src={ExitGroupIcon}
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
export default TeamShareList;
