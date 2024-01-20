import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";
import axios from "axios";
import { uploadFileToS3ByFormChangeEvent } from "@/utils/handleS3";

import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    // uploadFileToS3ByFormChangeEvent -> uploadFile
    // -> POST /api/media -> getSignedUrlParams -> getSignedUrl
    // -> PUT uploadUrl
    const meta = {
      directory: "/example1/example2",
      ownerId: session?.user.id ?? "",
    };
    const key = await uploadFileToS3ByFormChangeEvent(file, meta);
  };
  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const url = await axios.get(
      "/api/download?key=9b0174a2-a013-4c35-a0af-e1437fd26a81.jpeg"
    );
    setUrl(url.data.url);
  };
  const [url, setUrl] = useState<string>("");
  return (
    <main>
      <div>
        <p>select file to upload</p>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/jpeg image/png"
            name="file"
          />
          <button type="submit">upload</button>
        </form>
      </div>
      <div>
        <p>{`URL is ${url}`}</p>
        <button
          type="button"
          onClick={handleDownload}>
          download
        </button>
      </div>
    </main>
  );
}
