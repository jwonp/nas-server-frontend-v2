import { isSameArray } from "@/utils/array";
import Link from "next/link";


export type NavigatorSelectbuttonProps = {
  title: string;
  linkTo: string[];
  path: string[];
  depth: number;
};
const NavigatorSelectbutton = ({
  title,
  linkTo,
  path,
  depth,
}: NavigatorSelectbuttonProps) => {
  const selectedStyleBydepth = [`border-b-2 `, `text-yellow-500 `];
  const isInPath = isSameArray(path, linkTo, depth)
    ? selectedStyleBydepth[depth - 1]
    : "";
  return (
    <p
      className={`${isInPath} cursor-pointer w-full text-white text-lg font-bold p-2 pb-0 text-center border-white select-none`}>
      <Link href={`/admin/${linkTo.join('/')}`}>{title}</Link>
    </p>
  );
};
export default NavigatorSelectbutton;
