import { UserCredentials } from "@/types/UserCredentials";
import { decryptObject, encryptObject } from "@/utils/crypto";
import { SIGNIN_PASSWORD_REGEX_PATTERN } from "@/utils/strings";
import axios, { AxiosResponse } from "axios";
import { useRef, useState } from "react";
import Image from "next/image";
import userCircleIcon from "@public/icons/userCircle.png";
import { uploadProfileIconToS3 } from "@/utils/handleS3";
import { TemporaryAccountPostResponse } from "@/types/Responses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ERROR_ON_GENERATE_TEMPORARY_ACCOUNT =
  "계정 생성 과정 중 오류가 발생했습니다.";

const TemporaryAccountInput = () => {
  const $name = useRef<HTMLInputElement>(null);
  const $phone = useRef<HTMLInputElement>(null);
  const $domain = useRef<HTMLInputElement>(null);
  const $password = useRef<HTMLInputElement>(null);
  const $expireIn = useRef<HTMLInputElement>(null);
  const $icon = useRef<HTMLInputElement>(null);
  const $iconUrlRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorAlert, setErrorAlert] = useState<string>("");
  const queryClient = useQueryClient();
  const addTemporaryAccount = useMutation({
    mutationFn: (encryptedCredentials: string) =>
      axios
        .post("/api/admin/account/temporary", {
          account: encryptedCredentials,
        })
        .then(
          (res: AxiosResponse<TemporaryAccountPostResponse>) =>
            res.data.accountCode
        )
        .catch(() => ""),
    onSuccess: (data) => {
      window.navigator.clipboard.writeText(data);
      queryClient.invalidateQueries({ queryKey: ["temporary", "account"] });
    },
  });
  // const getRandomPhone = (): string => {
  //   const phone = `010${Math.floor(Math.random() * Math.pow(10, 8))}`;
  //   return phone;
  // };
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
      $name.current &&
      $domain.current &&
      $password.current &&
      $phone.current &&
      $expireIn.current;

    if (isExistRefs) {
      const imageFile = $icon?.current?.files;
      let key = "";
      if (imageFile && imageFile[0]) {
        key = await uploadProfileIconToS3(imageFile[0]);
      }
      const iconUrl = key ?? "";

      const credentials: UserCredentials & { expireIn: number } = {
        name: $name.current.value,
        username:
          $domain.current.value.length === 0
            ? `${$name.current.value}@ikiningyou.com`
            : `${$domain.current.value}@ikiningyou.com`,
        password: $password.current.value,
        phone: $phone.current.value,
        icon: iconUrl,
        expireIn: Number($expireIn.current.value),
      };
      console.log(credentials);

      const encryptedCredentials = encryptObject(credentials);
      if (!encryptedCredentials) {
        setErrorAlert(() => ERROR_ON_GENERATE_TEMPORARY_ACCOUNT);
        return;
      }
      addTemporaryAccount.mutate(encryptedCredentials);
      console.log(encryptedCredentials);
      console.log(decryptObject(encryptedCredentials as string));
    }
  };
  return (
    <section className="p-6 bg-slate-800 rounded-lg mb-4">
      <h1 className="text-xl font-bold indent-2 text-white">임시 계정 생성</h1>

      <div className="my-1 border-2 border-white rounded-full" />

      <form
        action={"#"}
        onSubmit={handleSubmitTemporayAccount}>
        <div className="w-full mb-1 py-1 px-3  rounded-lg">
          <label
            htmlFor="name"
            className="block mb-1 text-white">
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
            className="block mb-1 text-white">
            전화번호
          </label>
          <input
            ref={$phone}
            id="phone"
            minLength={8}
            maxLength={11}
            className="rounded-lg w-full p-2 text-black text-sm"
            placeholder="[선택] 전화번호를 입력하세요."
          />
        </div>
        <div className="w-full mb-1 py-1 px-3  rounded-lg">
          <label
            htmlFor="domain"
            className="block mb-1 text-white">
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
            className="block mb-1 text-white">
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
        <figure className="w-full mb-1 py-1 px-3 rounded-lg flex justify-between">
          <p className="text-white">아이콘</p>
          <label htmlFor="profile-icon">
            <figure className="cursor-pointer rounded-full overflow-hidden h-10 w-10">
              <Image
                src={preview ?? userCircleIcon}
                alt={""}
                width={40}
                height={40}
              />
            </figure>
          </label>
          <input
            ref={$icon}
            className={`text-white hidden rounded-lg leading-10 indent-3 w-full bg-slate-900 `}
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
        </figure>
        <p className="text-red-600 pl-4">{errorAlert}</p>
        <div className="flex mt-5">
          <button
            type="submit"
            className="ml-auto px-3 py-1 bg-blue-600 rounded-lg h-10 ">
            <p className="text-center min-w-[84px]  text-white break-keep">
              주소 복사
            </p>
          </button>
        </div>
      </form>
    </section>
  );
};

export default TemporaryAccountInput;
