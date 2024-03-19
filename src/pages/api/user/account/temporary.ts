// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { authOptions, dumySession } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import {
  ErrorResponse,
  SuccessResponse,
  UserSearchResponse,
} from "@/types/Responses";
import { decryptObject, encryptCredentials } from "@/utils/crypto";
import { UserCredentials } from "@/types/UserCredentials";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.body;

  if (!code || code === "") {
    return res.status(400).json({ error: "No account code" });
  }
  if (typeof code !== "string") {
    return res.status(400).json({ error: "Invaild account code" });
  }
  const { admin, expireIn, ...userCredentials } = decryptObject(
    code
  ) as UserCredentials & {
    admin: string;
    expireIn: number;
  };

  if (expireIn < Date.now()) {
    return res.status(400).json({ error: "This code is expired" });
  }

  const encryptedCredentials = await encryptCredentials(userCredentials);

  const result = await request(dumySession)
    .post(`/user/account/temporary`, {
      credentials: encryptedCredentials,
      admin: admin,
      expireIn: expireIn,
    })
    .then((res) => {
      return { status: res.status, data: res.data };
    })
    .catch((err: AxiosError) => {
      return {
        status: (err.response?.data as ErrorResponse).status ?? 400,
        msg: (err.response?.data as ErrorResponse).msg ?? "",
      };
    });

  const responseData =
    result.status / 100 < 4
      ? ((result as SuccessResponse).data as UserSearchResponse)
      : (result as ErrorResponse);
  res.status(result.status).json(responseData);
}
