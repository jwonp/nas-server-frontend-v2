import Image from "next/image";
import DarkCancelIcon from "@public/icons/close.svg";
import UserCircleIcon from "@public/icons/userCircle.png";
import DeleteUserIcon from "@public/icons/deleteUser.png";
import RejectRequestIcon from "@public/icons/close-white.svg";
import AcceptRequestIcon from "@public/icons/addUser-white.svg";
import ShareNavigator from "@/components/Share/ShareNavigator";
import { useRouter } from "next/router";
import ShareListContainer from "@/components/Share/ShareListContainer";
import ShareListBar from "@/components/Share/ShareListBar";
const UserShareList = () => {
  const router = useRouter();
  return (
    <section className="max-w-[1440px] w-full mx-auto p-4">
      <header className="w-full">
        <section className="w-full px-10 py-4 bg-slate-600 rounded-lg mb-4">
          <ul className="list-outside list-disc">
            <li>
              <p className="text-lg">
                다른 사용자를 공유 대상으로 추가하려면 이메일을 정확하게
                입력해야 합니다.
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
            placeholder="사용자의 이메일로 검색"
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

      <main className="gap-4">
        <article className="w-full min-w-[244px] h-14 p-2  border-white">
          <div>
            <p className="leading-10 text-xl">
              {"공유 대상으로 등록된 사용자가 없습니다."}
            </p>
          </div>
        </article>
        <ShareListContainer title={"테스트"}>
          <ShareListBar
            user={{
              iconURL: RejectRequestIcon,
              userId: "userId",
              username: "박주원",
              email: "tkdel222@gmail.com"
            }}
            buttons={[
              {
                src: RejectRequestIcon,
                onClick: (e) => {
                  console.log("clicked");
                },
              },
            ]}></ShareListBar>
        </ShareListContainer>
        <section className="w-full mb-2">
          <nav className="w-full border-b-4 border-white">
            <p className="indent-2 text-xl">공유할 수 있는 사용자</p>
          </nav>
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
            <div className="px-2 my-auto">
              <figure className="hover:bg-slate-400 rounded-full overflow-hidden">
                <Image
                  className="min-w-[32px] min-h-[32px] p-1"
                  src={DeleteUserIcon}
                  alt={""}
                  width={33}
                  height={33}
                />
              </figure>
            </div>
          </article>
        </section>
        <section className=" w-full mb-2">
          <nav className="w-full border-b-4 border-white">
            <p className="indent-2 text-xl">공유 요청</p>
          </nav>
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
            <div className="px-2 flex gap-2 my-auto">
              <figure className="hover:bg-slate-400 rounded-full overflow-hidden max-w-[33px] max-h-[33px]">
                <Image
                  className="min-w-[32px] min-h-[32px] p-1"
                  src={AcceptRequestIcon}
                  alt={""}
                  width={33}
                  height={33}
                />
              </figure>
              <figure className="hover:bg-slate-400 rounded-full overflow-hidden max-w-[32px] max-h-[32px]">
                <Image
                  className="min-w-[32px] min-h-[32px] p-1"
                  src={RejectRequestIcon}
                  alt={""}
                  width={32}
                  height={32}
                />
              </figure>
            </div>
          </article>
        </section>
        <section className="w-full mb-2">
          <nav className="w-full border-b-4 border-white">
            <p className="indent-2 text-xl">검색 결과</p>
          </nav>
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
        </section>
      </main>
    </section>
  );
};
export default UserShareList;
