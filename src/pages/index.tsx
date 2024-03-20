import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isReadyAccount, setReadyAccount] = useState<boolean>(false);
  const [isExpired, setExpired] = useState<boolean>(false);
  const [guestName, setGusetName] = useState<string>("");

  useEffect(() => {
    if (router.isReady && window.localStorage && router.query.code) {
      window.localStorage.setItem("accountCode", router.query.code as string);

      router.push("/");
    }
  }, [router, router.isReady, router.query.code]);
  useEffect(() => {
    if (window.localStorage && window.localStorage.getItem("accountCode")) {
      const accountCode = window.localStorage.getItem("accountCode");
      if (accountCode) {
        const code = decodeURIComponent(accountCode);
        axios
          .post("/api/user/account/temporary", { code })
          .then((res) => {
            const userDetail = res.data.userDetail as string;
            const name = res.data.name as string;
            window.localStorage.setItem("guest", userDetail);
            setReadyAccount(() => (userDetail ? true : false));
            setGusetName(() => name ?? "");
          })
          .catch((e: AxiosError) => {
            if (e.response?.status === 403) {
              setExpired(() => true);
            }
          });
      }
    }
  }, [router.isReady]);
  return (
    <div className="w-screen h-screen ">
      <main className="flex w-1/2 h-full mx-auto my-5">
        <section className="w-full">
          <div className="mx-auto w-full  bg-slate-800 py-10 rounded-xl">
            {status === "unauthenticated" && isExpired === false && (
              <>
                <p className="text-white text-xl text-center font-bold mb-2">{`${
                  guestName ? `${guestName}님` : ""
                } 방문해주셔서 감사합니다`}</p>
                <p className="text-white text-center font-bold">{`${
                  isReadyAccount ? `게스트 계정이 준비되었습니다.` : ""
                } `}</p>
                <p className="text-white text-center font-bold">{`아래 로그인 버튼을 클릭해서 로그인 해주세요`}</p>
                <div className="flex mt-5 cursor-pointer">
                  <button
                    className="mx-auto text-white font-bold bg-blue-700 hover:bg-blue-600 px-5 py-2 rounded-xl"
                    onClick={() => signIn()}>
                    로그인
                  </button>
                </div>
              </>
            )}
            {status === "unauthenticated" && isExpired && (
              <>
                <p className="text-white text-xl text-center font-bold mb-2">
                  초대 링크가 만료되었습니다.
                </p>
                <p className="text-white text-xl text-center font-bold mb-2">
                  tkdel222@gmail.com로 문의해주세요.
                </p>
              </>
            )}
            {status === "authenticated" && (
              <div>
                <p className="text-white text-xl text-center font-bold mb-2">{`${session.user.name}님 환영합니다.`}</p>
                <div className="flex mt-5 cursor-pointer">
                  <button
                    className="mx-auto text-white font-bold bg-blue-700 hover:bg-blue-600 px-5 py-2 rounded-xl"
                    onClick={() => {
                      router.push("/storage");
                    }}>
                    저장소로 이동
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
