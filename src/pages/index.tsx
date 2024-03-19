import { Inter } from "next/font/google";
import { useEffect, useRef } from "react";

import { signIn } from "next-auth/react";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import axios from "axios";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

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
          window.localStorage.setItem("guest", userDetail);
          signIn();
        });
      }
    }
  }, [router.isReady]);
  return (
    <div className="w-screen h-screen">
      <Header isInvisibleSideBarButton />
      <main className="flex w-1/2 h-full mx-auto my-5">
        <section className="w-full ">
          <p className="text-white text-xl font-bold">{`{게스트} `} </p>
        </section>
      </main>
    </div>
  );
}
