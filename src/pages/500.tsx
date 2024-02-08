import Link from "next/link";

const Error500Page = () => {
  return (
    <div className="flex w-screen h-screen text-xl">
      <div className="m-auto ">
        <p>예기치 못한 오류가 발생했습니다.</p>
        <div className="flex m-4 p-2 bg-slate-700 rounded-lg">
          <div className="mx-auto">
            <Link href={"/storage"}>메인 페이지로 돌아가기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Error500Page;
