import Header from "@/components/Header/Header";
import { AdminCheckResponse, ErrorResponse } from "@/types/Responses";
import { getServerSession } from "next-auth";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { request } from "@/utils/request";
import { useRouter } from "next/router";
import TemporaryAccount from "@/components/Admin/Temporary/TemporaryAccount";
const AdminIndexPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const isOccuerdError = (props as ErrorResponse)?.msg;
  const isNotAdmin = (props as AdminCheckResponse)?.isAdmin === false;
  useEffect(() => {
    if (isOccuerdError || isNotAdmin) {
      router.push("/no-page");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isOccuerdError || isNotAdmin) {
    return <div></div>;
  }
  return (
    <div>
      <Header isInvisibleSideBarButton />
      <main >
        <TemporaryAccount/>
      </main>
    </div>
  );
};

export default AdminIndexPage;

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user) {
    return { props: { status: 403, msg: "Unauthorized" } };
  }

  const adminCheckResponse = await request(session?.user)
    .get(`${process.env.BACKEND_ENDPOINT}/admin/check`)
    .then((res: AxiosResponse<AdminCheckResponse>) => {
      return res.data;
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error: ErrorResponse = {
        status: err.status ?? 400,
        msg: err.response?.data.error ?? "Unknown Error",
      };
      return error;
    });

  return { props: { ...adminCheckResponse } };
}) satisfies GetServerSideProps<AdminCheckResponse | ErrorResponse>;
