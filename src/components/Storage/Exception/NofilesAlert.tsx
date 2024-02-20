import Image from "next/image";
import AddFileIcon from "@public/icons/addFile.png";
import AddFolderIcon from "@public/icons/addFolder.png";
const NofilesAlert = () => {
  return (
    <article className="flex py-10">
      <div className="mx-auto">
        <div className="flex">
          <p className="leading-7 text-xl">우측 상단의</p>
          <figure className="mx-1">
            <Image
              src={AddFolderIcon}
              alt={""}
              width={24}
              height={24}
            />
          </figure>
          <p className="leading-7 text-xl">나</p>
          <figure className="mx-1">
            <Image
              src={AddFileIcon}
              alt={""}
              width={24}
              height={24}
            />
          </figure>
          <p className="leading-7 text-xl">
            를 클릭해서 폴더 및 파일를 추가해주세요.
          </p>
        </div>
      </div>
    </article>
  );
};
export default NofilesAlert;
