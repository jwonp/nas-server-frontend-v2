import Link from "next/link";

const Error404Page = () => {

  return (
    <div className="fixed flex w-screen h-screen text-xl bg-black ">
      <div className="m-auto">
        <p>존재하지 않는 페이지입니다.</p>
        <div className="flex m-4 p-2 bg-slate-600 rounded-lg">
          <div className="mx-auto">
            <Link href={"/storage"}>메인 페이지로 돌아가기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
