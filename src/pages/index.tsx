import { Inter } from "next/font/google";
import { useState } from "react";

import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <div></div>
    </main>
  );
}
