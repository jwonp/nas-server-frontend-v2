import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

import { signIn } from "next-auth/react";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });
type HomeProps = {
  isSignedIn: boolean;
};
export default function Home({
  isSignedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [isReadyAccount, setReadyAccount] = useState<boolean>(false);
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
        axios.post("/api/user/account/temporary", { code }).then((res) => {
          const userDetail = res.data.userDetail as string;
          const name = res.data.name as string;
          window.localStorage.setItem("guest", userDetail);
          setReadyAccount(() => (userDetail ? true : false));
          setGusetName(() => name ?? "");
        });
      }
    }
  }, [router.isReady]);
  useEffect(() => {
    if (isSignedIn) {
      router.push("/storage");
    }
  }, [isSignedIn, router]);
  if (isSignedIn) {
    return <div></div>;
  }
  return (
    <div className="w-screen h-screen">
      <Header isInvisibleSideBarButton />
      <main className="flex w-1/2 h-full mx-auto my-5">
        <section className="w-full">
          <div className="mx-auto w-full bg-slate-800 py-10 rounded-xl">
            <p className="text-white text-xl text-center font-bold mb-2">{`${
              guestName ? `${guestName}님` : ""
            } 방문해주셔서 감사합니다`}</p>
            <p className="text-white text-center font-bold">{`${
              isReadyAccount ? `게스트 계정이 준비되었으니` : ""
            }아래 로그인 버튼을 클릭해서 로그인 해주세요`}</p>
            <div className="flex mt-5 cursor-pointer">
              <button
                className="mx-auto text-white font-bold bg-blue-700 hover:bg-blue-600 px-5 py-2 rounded-xl"
                onClick={() => signIn()}>
                로그인
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const isSignedIn = session && session.user;

  return { props: { isSignedIn: isSignedIn } };
}) satisfies GetServerSideProps<HomeProps>;
