import { ParsedUrlQuery } from "querystring";

export const getPath = (query: ParsedUrlQuery) => {
  if (!query || !query.path) {
    return [];
  }
  if (typeof query.path === "string") {
    return [query.path as string];
  }
  return query.path as string[];
};
