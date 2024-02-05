import Link from "next/link";

const Error404Page = () => {
  return (
    <div className="flex w-screen h-screen text-xl">
      <div className="m-auto ">
        <p>Oops... This page does not exist</p>
        <div className="flex m-4 p-2 bg-slate-700 rounded-lg">
          <div className="mx-auto">
            <Link href={"/storage"}>Back to main page</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
