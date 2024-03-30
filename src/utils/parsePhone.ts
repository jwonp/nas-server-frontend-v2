import { String } from "aws-sdk/clients/codepipeline";

const areaCodes = [
  "02",
  "032",
  "042",
  "051",
  "052",
  "053",
  "062",
  "064",
  "031",
  "033",
  "041",
  "043",
  "054",
  "055",
  "061",
  "063",
  "010",
];
const getHyphenatedPhone = (areaCode: string, restPhone: String) => {
  if (restPhone.length === 7) {
    const front = restPhone.substring(0, 3);
    const back = restPhone.substring(3);
    return `${areaCode}-${front}-${back}`;
  }
  const front = restPhone.substring(0, 4);
  const back = restPhone.substring(4);
  return `${areaCode}-${front}-${back}`;
};
export const getPhoneString = (phone: string) => {
  if (phone.length < 9) {
    return "";
  }
  if (phone.startsWith("02")) {
    const areaCode = phone.substring(0, 2);
    const restPhone = phone.substring(2);
    return getHyphenatedPhone(areaCode, restPhone);
  }
  const areaCode = phone.substring(0, 3);
  const restPhone = phone.substring(3);
  return getHyphenatedPhone(areaCode, restPhone);
};
