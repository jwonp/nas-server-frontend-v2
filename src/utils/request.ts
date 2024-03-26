import { UserSession } from "@/types/UserSession";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createJWT } from "./jwt";
import { ErrorResponse, SuccessResponse } from "@/types/Responses";
import { type Error } from "@/types/Responses";
export const request = (user: Omit<UserSession, "volume">) => {
  const instance = axios.create({
    baseURL: process.env.BACKEND_ENDPOINT,
    timeout: 3000,
    headers: { Authorization: `Bearer ${createJWT(user)}` },
  });

  return instance;
};

export const InitErroResponse: ErrorResponse | SuccessResponse<any> = {
  status: 500,
  body: { msg: "No response" },
};
export const response = async <T = any, D = any>(
  result: Promise<AxiosResponse<T, D>>
): Promise<SuccessResponse<T> | ErrorResponse> => {
  const res = await result
    .then((res: AxiosResponse<T, D>) => {
      const successResponse: SuccessResponse<T> = {
        status: res.status,
        body: res.data as T,
      };
      return successResponse;
    })
    .catch((err: AxiosError<Error, D>) => {
      const errorResponse: ErrorResponse = {
        status: err.status ?? 400,
        body: { msg: err.response ? err.response.data.body.msg : err.message },
      };
      return errorResponse;
    });
  console.log(res);
  return res;
};
