import { Inter } from "next/font/google";
import { useState } from "react";

import { useSession } from "next-auth/react";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="w-screen h-screen">
      <Header isInvisibleSideBarButton />
      <main className="flex w-3/4 h-full mx-auto my-5">
        <section className="w-full ">
          
        </section>
      </main>
    </div>
  );
}
