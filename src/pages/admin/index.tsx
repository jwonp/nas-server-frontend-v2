import Header from "@/components/Header/Header";
import { SIGNIN_PASSWORD_REGEX_PATTERN } from "@/utils/strings";
import { useRef } from "react";

import { UserCredentials } from "@/types/UserCredentials";
import { encryptCredentials, encryptObject } from "@/utils/crypto";

const AdminIndexPage = () => {
  const $name = useRef<HTMLInputElement>(null);
  const $phone = useRef<HTMLInputElement>(null);
  const $domain = useRef<HTMLInputElement>(null);
  const $password = useRef<HTMLInputElement>(null);
  const $expireIn = useRef<HTMLInputElement>(null);
  const getRandomPhone = (): string => {
    const phone = `010${Math.floor(Math.random() * Math.pow(10, 8))}`;
    return phone;
  };
  const getRandomPassword = (): string => {
    const possibleCharaacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_!@#$.%`^)(*+=-";
    const password = Array.from(Array(16), () =>
      possibleCharaacters.charAt(
        Math.floor(Math.random() * possibleCharaacters.length)
      )
    ).join("");
    const passwordRegEx = new RegExp(SIGNIN_PASSWORD_REGEX_PATTERN);
    return passwordRegEx.exec(password) ? password : getRandomPassword();
  };

  const handleSubmitTemporayAccount = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // window.navigator.clipboard.writeText("text");
    const isExistRefs =
      $name.current && $domain.current && $password.current && $phone.current;
    if (isExistRefs) {
      const credentials: UserCredentials = {
        name: $name.current.value,
        username:
          $domain.current.value.length === 0
            ? `${$name.current.value}@ikiningyou.com`
            : `${$domain.current.value}@ikiningyou.com`,
        password: $password.current.value,
        phone:
          $phone.current.value.length === 0
            ? getRandomPhone()
            : $phone.current.value,
        icon: "",
      };
      console.log(credentials);
      
      const encryptedCredentials = encryptObject(credentials);
      console.log(encryptedCredentials);
    }
  };
  return (
    <div>
      <Header isAdminPage />
      <main className="grid grid-cols-7 p-4 gap-2">
        <section className="col-span-2  p-6 bg-slate-800 rounded-lg">
          <h1 className="text-xl font-bold indent-2">임시 계정 생성</h1>

          <div className="my-1 border-2 border-white rounded-full" />

          <form
            action={"#"}
            onSubmit={handleSubmitTemporayAccount}>
            <div className="w-full mb-1 py-1 px-3  rounded-lg">
              <label
                htmlFor="name"
                className="block mb-1">
                사용자 이름
              </label>
              <input
                ref={$name}
                id="name"
                required
                className="rounded-lg w-full p-2 text-black text-sm"
                placeholder="이름을 입력하세요."
              />
            </div>
            <div className="w-full mb-1 py-1 px-3 rounded-lg">
              <label
                htmlFor="phone"
                className="block mb-1">
                전화번호
              </label>
              <input
                ref={$phone}
                id="phone"
                className="rounded-lg w-full p-2 text-black text-sm"
                placeholder="[선택] 전화번호를 입력하세요."
              />
            </div>
            <div className="w-full mb-1 py-1 px-3  rounded-lg">
              <label
                htmlFor="domain"
                className="block mb-1">
                도메인
              </label>
              <input
                ref={$domain}
                id="domain"
                className="rounded-lg w-full p-2 text-black text-sm"
                placeholder="[선택] 회사 도메인을 입력하세요"
              />
            </div>

            <input
              ref={$password}
              type="hidden"
              defaultValue={getRandomPassword()}
            />

            <div className="w-full mb-1 py-1 px-3  rounded-lg">
              <label
                htmlFor="expireIn"
                className="block mb-1">
                유효 기간(일)
              </label>
              <input
                ref={$expireIn}
                id="expireIn"
                required
                className="rounded-lg w-full p-2 text-black text-sm"
                placeholder="유효 기간을 입력하세요."
                defaultValue={30}
              />
            </div>
            <div className="flex mt-5">
              <button
                type="submit"
                className="ml-auto px-3 py-1 bg-blue-600 rounded-lg h-10 text-center  text-white">
                주소 복사
              </button>
            </div>
          </form>
        </section>
        <section className="col-span-5  p-6 bg-slate-800 rounded-lg">
          <h1 className="text-xl font-bold indent-2">임시 계정 목록</h1>
          <div className="my-1 border-2 border-white rounded-full" />
          <div></div>
        </section>
      </main>
    </div>
  );
};

export default AdminIndexPage;
