import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import userIcon from "@public/icons/userCircle.png";
import { useHover } from "@uidotdev/usehooks";
import { uploadProfileIconToS3 } from "@/utils/handleS3";

type InputVaild = {
  username: boolean;
  password: boolean;
  name: boolean;
  phone: boolean;
};
const InitInputVaiid: InputVaild = {
  username: false,
  password: false,
  name: false,
  phone: false,
};
const SignUp = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isInputVaild, setInputVaild] = useState<InputVaild>(InitInputVaiid);
  const $iconUrlRef = useRef<HTMLInputElement>(null);
  const [ref, hovering] = useHover();
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("profile-icon") as File;
    const key = await uploadProfileIconToS3(file);
    if (!$iconUrlRef.current) {
      return;
    }
    $iconUrlRef.current.value = key ?? "";
    e.target.submit();
  };
  return (
    <div className="w-screen h-screen flex">
      <div className="m-auto">
        <div className="flex w-[320px] h-fit p-6 rounded-lg bg-slate-600">
          <div className="w-full">
            <form
              method="post"
              action="/api/auth/callback/credentials"
              onSubmit={handleSubmit}>
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
              />
              <div className="text-2xl text-center mb-2">회원가입</div>
              <div className="mb-2">
                <div>
                  <label className="text-xl">아이디</label>
                </div>
                <div>
                  <input
                    className={`rounded-lg leading-10 indent-3 w-full bg-slate-900  ${
                      isInputVaild.username ? "text-white" : "text-red-600"
                    }`}
                    name="username"
                    required
                    autoFocus
                    autoComplete="on"
                    placeholder={"이메일을 입력하세요."}
                    type="email"
                    onChange={(e) => {
                      setInputVaild((prev) => {
                        return {
                          ...prev,
                          username: e.target.value.match(
                            /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
                          )
                            ? true
                            : false,
                        };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="flex justify-between">
                  <div className="text-xl">비밀번호</div>
                  <div className="text-xs leading-7 align-bottom">
                    커서를 가져가면 비밀번호가 표시됩니다
                  </div>
                </label>
                <div>
                  <input
                    ref={ref}
                    className={`rounded-lg leading-10 indent-3 w-full bg-slate-900 ${
                      isInputVaild.password ? "text-white" : "text-red-600"
                    }`}
                    name="password"
                    required
                    minLength={8}
                    autoComplete="on"
                    placeholder={"비밀번호는 8자 이상입니다."}
                    type={`${hovering ? "text" : "password"}`}
                    onChange={(e) => {
                      setInputVaild((prev) => {
                        return {
                          ...prev,
                          password: e.target.value.match(
                            /^(?=.*[a-zA-Z])(?=.*[_!@#$.%`^)(*+=-])(?=.*[0-9]).{8,32}$/
                          )
                            ? true
                            : false,
                        };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between mb-2 gap-2">
                <div className="w-4/5">
                  <div>
                    <label className="text-xl">이름</label>
                  </div>
                  <div>
                    <input
                      className={`rounded-lg leading-10 indent-3 w-full focus:outline-none border- bg-slate-900 ${
                        isInputVaild.name
                          ? "focus:border-slate-500"
                          : "focus:text-red-600"
                      } `}
                      name="name"
                      required
                      autoComplete="on"
                      placeholder={`이름을 입력해주세요.`}
                      type="text"
                      onChange={(e) => {
                        setInputVaild((prev) => {
                          return {
                            ...prev,
                            name: e.target.value.length > 0 ? true : false,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mt-auto">
                  <label htmlFor="profile-icon">
                    <div className="cursor-pointer rounded-full overflow-hidden max-h-12 relative h-12 w-12">
                      <Image
                        src={preview ?? userIcon}
                        alt={""}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </label>
                  <div>
                    <input
                      className={`hidden rounded-lg leading-10 indent-3 w-full bg-slate-900 `}
                      id="profile-icon"
                      name="profile-icon"
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setPreview(() => e.target?.result as string);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                    <input
                      ref={$iconUrlRef}
                      id="icon-url"
                      name="icon"
                      className="hidden"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div>
                  <label className="text-xl">전화번호</label>
                </div>
                <div>
                  <input
                    className={`rounded-lg leading-10 indent-3 w-full bg-slate-900 ${
                      isInputVaild.phone ? "text-white" : "text-red-600"
                    }`}
                    name="phone"
                    required
                    minLength={10}
                    maxLength={11}
                    autoComplete="on"
                    placeholder={`'-' 를 제외하고 입력하세요.`}
                    type="text"
                    onChange={(e) => {
                      setInputVaild((prev) => {
                        return {
                          ...prev,
                          phone: e.target.value.match(
                            /^01[0|1|6|7|8|9]?[0-9]{8,9}$/
                          )
                            ? true
                            : false,
                        };
                      });
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`mb-1 mt-4 text-xl rounded-lg border w-full py-1 cursor-pointer ${
                  Object.values(isInputVaild).includes(false) &&
                  "opacity-50 cursor-default"
                }`}
                disabled={Object.values(isInputVaild).includes(false)}>
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
export default SignUp;
