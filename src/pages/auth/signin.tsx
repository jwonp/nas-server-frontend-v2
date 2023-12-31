import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
              <div className="text-2xl text-center mb-2">Login</div>
              <div className="mb-2">
                <div>
                  <label className="text-xl">Username</label>
                </div>
                <div>
                  <input
                    className="rounded-lg leading-10 indent-3 w-full bg-slate-900"
                    name="username"
                    placeholder="username"
                    type="text"
                  />
                </div>
              </div>
              <div className="mb-2">
                <div>
                  <label className="text-xl">Password</label>
                </div>
                <div>
                  <input
                    className="rounded-lg leading-10 indent-3 w-full bg-slate-900"
                    name="password"
                    placeholder="password"
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
