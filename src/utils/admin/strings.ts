import { getTimeString } from "../parseTime";
import { SIGNIN_PASSWORD_REGEX_PATTERN } from "@/utils/strings";
export const getExpiredString = (expireIn: number) => {
  if (expireIn < Date.now()) {
    return `expired at ${getTimeString(expireIn)}`;
  }
  return `expire in ${getTimeString(expireIn)}`;
};
export   const getRandomPassword = (): string => {
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
export   const getRandomPhone = (): string => {
    const phone = `010${Math.floor(Math.random() * Math.pow(10, 8))}`;
    return phone;
  };
