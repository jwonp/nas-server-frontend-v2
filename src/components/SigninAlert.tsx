import { signIn } from "next-auth/react";
const SigninAlert = () => {
  return (
    <section className="flex w-screen h-full">
      <div className="m-auto">
        <div className="flex w-[320px] h-fit p-6 rounded-lg bg-slate-600">
          <div className="w-full">
            <div className=" text-center mb-4">
              로그인이 필요한 서비스 입니다.
            </div>
            <div className=" text-center mb-4">
              아래 링크를 통해서 로그인 해주세요.
            </div>
            <div className="flex">
              <div
                className="text-xl mx-auto text-center cursor-pointer underline decoration-solid"
                onClick={() => {
                  signIn();
                }}>
                로그인
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SigninAlert;
