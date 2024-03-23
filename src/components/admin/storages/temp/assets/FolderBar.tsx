import RightIcon from "@public/icons/right-white.svg";
import FolderIcon from "@public/icons/folder.png";
import CheckedIcon from "@public/icons/checked-white.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ItemBarProps } from "./utils";
type FolderBarProps = { children: React.ReactNode } & ItemBarProps;
const FolderBar = ({
  id,
  title,
  selectedItem,
  depth,
  onClick,
  isSaved,
  children,
}: FolderBarProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);

  return (
    <section
      className={`${selectedItem === id ? "bg-slate-600" : ""}`}
      style={{ paddingLeft: `${depth === 0 ? 0 : 24}px` }}
      onClick={onClick}>
      <article className="flex h-8">
        <figure
          id={`${id}%button%${isOpened ? "opened" : "closed"}`}
          className={`${
            isOpened ? "rotate-90 duration-100 " : "rotate-0 duration-100 "
          } cursor-pointer w-6 my-auto`}
          onClick={(e) => {
            e.stopPropagation();
            setOpened((prev) => !prev);
          }}>
          <Image
            src={RightIcon}
            alt={""}
            width={24}
            height={24}
          />
        </figure>
        <figure className="cursor-pointer w-6 my-auto">
          <Image
            src={FolderIcon}
            alt={""}
            width={24}
            height={24}
          />
        </figure>
        <p
          id={id}
          className="indent-2 leading-8  min-w-5">
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
      {isOpened && (
        <section
          style={{ marginLeft: `11px` }}
          className={`border-slate-500 border-l`}>
          {children}
        </section>
      )}
    </section>
  );
};

export default FolderBar;
