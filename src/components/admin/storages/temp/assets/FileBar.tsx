import FileIcon from "@public/icons/file.png";
import Image from "next/image";
import CheckedIcon from "@public/icons/checked-white.svg";
import { ItemBarProps } from "./utils";
type FileBarProps = ItemBarProps;
const FileBar = ({
  id,
  title,
  selectedItem,
  depth,
  onClick,
  isSaved,
}: FileBarProps) => {
  return (
    <section
      style={{ paddingLeft: `${depth === 0 ? 0 : 24}px` }}
      className={`${selectedItem === id ? "bg-slate-600" : ""}`}
      onClick={onClick}>
      <article className="flex h-8">
        <figure className={`cursor-pointer w-6 my-auto`}>
          <Image
            src={FileIcon}
            alt={""}
            width={24}
            height={24}
          />
        </figure>
        <p
          id={id}
          className="leading-8 min-w-5">
          {title}
        </p>
        {isSaved === true && (
          <figure className="cursor-pointer w-6 my-auto">
            <Image
              src={CheckedIcon}
              alt={""}
              width={24}
              height={24}
            />
          </figure>
        )}
      </article>
    </section>
  );
};
export default FileBar;
