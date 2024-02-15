import { randomBytes } from "crypto";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const getRandomID = () => {
    return randomBytes(128).toString("hex");
  };
  useEffect(() => {
    const { error } = router.query;
    console.log(error);
    if (error && typeof error === "string") {
      setError(() => error);
    }
  }, [router]);
  const handleClickSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/auth/signup");
  };
  return (
    <div className="w-screen h-screen flex">
      <div className="m-auto">
        <div className="flex w-[320px] h-fit p-6 rounded-lg bg-slate-600">
          <div className="w-full">
            <form
              method="post"
              action="/api/auth/callback/credentials">
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
              />
              <div className="text-2xl text-center mb-2">Sign in</div>
              {error && (
                <div className="text-red-500 text-center">
                  로그인 정보가 올바르지 않습니다.
                </div>
              )}
              <div className="mb-2">
                <div>
                  <label className="text-xl">ID</label>
                </div>
                <div>
                  <input
                    className={`rounded-lg leading-10 indent-3 w-full bg-slate-900 ${
                      error === "CredentialsSignin" && "placeholder-red-600"
                    }`}
                    name="username"
                    required
                    autoFocus
                    autoComplete="on"
                    placeholder={`${
                      error === "CredentialsSignin"
                        ? "아이디 혹은 비밀번호를 확인해주세요."
                        : "이메일을 입력하세요."
                    }`}
                    type="email"
                  />
                </div>
              </div>
              <div className="mb-2">
                <div>
                  <label className="text-xl">Password</label>
                </div>
                <div>
                  <input
                    className={`rounded-lg leading-10 indent-3 w-full bg-slate-900 ${
                      error === "CredentialsSignin" && "placeholder-red-600"
                    }`}
                    name="password"
                    required
                    minLength={8}
                    autoComplete="on"
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[_!@#$%^*+=-])[a-zA-Z_!@#$%^*+=0-9]{8,32}$"
                    placeholder={`${
                      error === "CredentialsSignin"
                        ? "아이디 혹은 비밀번호를 확인해주세요."
                        : "비밀번호는 8자 이상입니다."
                    }`}
                    type="password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mb-1 mt-4 text-xl rounded-lg border w-full py-1">
                Sign in
              </button>
            </form>
            <form
              method="post"
              action="/api/auth/callback/credentials">
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
              />
              <input
                name="newuser"
                value={getRandomID()}
                type="hidden"
              />
              <button
                type="button"
                className="mb-1 mt-4 text-xl rounded-lg border w-full py-1"
                onClick={handleClickSignUp}>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
