import Image from "next/image";
import { Inter } from "next/font/google";
import { ChangeEvent, useState } from "react";
import axios from "axios";

const uploadToS3 = async (e: ChangeEvent<HTMLFormElement>) => {
  const formData = new FormData(e.target);

  const file = formData.get("file");

  if (!file) {
    return null;
  }

  // @ts-ignore
  const fileType = encodeURIComponent(file.type);

  const { data } = await axios.get(`/api/media?fileType=${fileType}`);

  const { uploadUrl, key } = data;

  await axios.put(uploadUrl, file);

  return key;
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const key = await uploadToS3(e);
  };
  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const url = await axios.get("/api/download");
    setUrl(url.data.url);
  };
  const [url, setUrl] = useState<string>("");
  return (
    <main>
      <div>
        <p>select file to upload</p>
        <form onSubmit={(e: ChangeEvent<HTMLFormElement>)=>{
          e.preventDefault();
            const formData = new FormData(e.target);

            const file = formData.get("file");
          
            if (!file) {
              return null;
            }
          
            // @ts-ignore
            const fileType = encodeURIComponent(file.type);
            console.log(fileType);
        }
          //handleSubmit
          }>
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
