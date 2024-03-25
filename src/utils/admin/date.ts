export const isExpired = (expireIn: number) => {
  return expireIn < Date.now();
};
