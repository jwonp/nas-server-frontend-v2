export type DateTime = {
  year: number;
  month: number;
  date: number;
  day: string;
  hour: number;
  minute: number;
  second: number;
};
export const day = ["일", "월", "화", "수", "목", "금", "토"];
export const getTimeString = (dateTime: number): string => {
  const date = new Date(dateTime);
  const timezoneOffset = date.getTimezoneOffset();
  const today = new Date(Date.now());
  const uploadTime: DateTime = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: day[date.getDay()],
    hour: date.getHours(), // - timezoneOffset / 60,
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
  if (today.getDate() === uploadTime.date) {
    return `${uploadTime.hour.toString().padStart(2, "0")}:${uploadTime.minute
      .toString()
      .padStart(2, "0")}`;
  }
  if (today.getFullYear() === uploadTime.year) {
    return `${uploadTime.year}.${uploadTime.month
      .toString()
      .padStart(2, "0")}.${uploadTime.date.toString().padStart(2, "0")} `;
  }

  //2024-01-20T01:32:54.806Z
  return `${uploadTime.year}.${uploadTime.month
    .toString()
    .padStart(2, "0")}.${uploadTime.date.toString().padStart(2, "0")}`;
};

