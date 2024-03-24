import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import {
  GetServerSidePropsContext,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { dumySession } from "./api/auth/[...nextauth]";
import { request } from "@/utils/request";
import { decryptObject, encryptCredentials } from "@/utils/crypto";
import { UserCredentials } from "@/types/UserCredentials";
import { ErrorResponse, SuccessResponse } from "@/types/Responses";

const inter = Inter({ subsets: ["latin"] });
type Guest = {
  userDetail: string;
  name: string;
};
export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if ((props as Guest).userDetail) {
      window.localStorage.setItem("guest", (props as Guest).userDetail);
    }
  }, [props]);

  return (
    <div className="w-screen h-screen ">
      <main className="flex w-1/2 h-full mx-auto my-5">
        <section className="w-full">
          <div className="mx-auto w-full  bg-slate-800 py-10 rounded-xl">
            {status === "unauthenticated" &&
              !router.query.code &&
              (props as ErrorResponse).msg !== undefined && (
                <>
                  <p className="text-white text-xl text-center font-bold mb-2">
                    환영합니다.
                  </p>
                  <p className="text-white text-xl text-center font-bold mb-2">
                    이 서비스는 로그인이 필요한 서비스입니다.
                  </p>
                </>
              )}
            {status === "unauthenticated" &&
              (props as ErrorResponse).msg === undefined && (
                <>
                  <p className="text-white text-xl text-center font-bold mb-2">{`${
                    (props as { userDetail: string; name: string }).name
                      ? `${
                          (props as { userDetail: string; name: string }).name
                        }님`
                      : ""
                  } 방문해주셔서 감사합니다`}</p>
                  <p className="text-white text-center font-bold">{`${
                    (props as Guest).userDetail
                      ? `게스트 계정이 준비되었습니다.`
                      : ""
                  } `}</p>
                  <p className="text-white text-center font-bold">{`아래 버튼을 누르시면 자동으로 로그인 됩니다.`}</p>
                  <div className="flex mt-5 cursor-pointer">
                    <button
                      className="mx-auto text-white font-bold bg-blue-700 hover:bg-blue-600 px-5 py-2 rounded-xl"
                      onClick={() => signIn()}>
                      자동 로그인
                    </button>
                  </div>
                </>
              )}
            {status === "unauthenticated" &&
              (router.query.code as string)?.length > 0 &&
              (props as ErrorResponse).status >= 400 && (
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
export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const code = context.query.code as string;
  if (!code) {
    return { props: { status: 201, msg: "No code" } };
  }
  const { admin, expireIn, ...userCredentials } = decryptObject(
    code
  ) as UserCredentials & {
    admin: string;
    expireIn: number;
  };

  if (expireIn < Date.now()) {
    return { props: { status: 400, msg: "Expired code" } };
  }
  const encryptedCredentials = await encryptCredentials(userCredentials);

  const result = await request(dumySession)
    .post(`/user/account/temporary`, {
      credentials: encryptedCredentials,
      admin: admin,
      expireIn: expireIn,
    })
    .then((res) => {
      return {
        status: res.status,
        data: {
          userDetail: res.data?.userDetail,
          name: userCredentials.name,
        },
      };
    })
    .catch((err: AxiosError) => {
      return {
        status: err.response?.status ?? 400,
        msg: (err.response?.data as ErrorResponse).msg ?? "",
      };
    });
  const responseData =
    result.status / 100 < 4
      ? ((result as SuccessResponse).data as {
          userDetail: string;
          name: string;
        })
      : (result as ErrorResponse);
  console.log(responseData);
  return {
    props: responseData,
  };
}) satisfies GetServerSideProps<Guest | ErrorResponse>;
