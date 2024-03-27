import { AdminCheckResponse, ErrorResponse } from "@/types/Responses";
import { getServerSession } from "next-auth";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { request, response } from "@/utils/request";
import { useRouter } from "next/router";
import TemporaryAccount from "@/components/admin/users/temporary/TemporaryAccount";
import AdminPageNavigator from "@/components/admin/Navigator/AdminPageNavigator";
import { getPath } from "@/utils/admin/route";
import AdminUser from "@/components/admin/users/user/AdminUser";
import TempStorage from "@/components/admin/storages/temp/TempStroage";
const AdminPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const [path, setPath] = useState<string[]>([]);
  const isOccuerdError = (props as ErrorResponse)?.body?.msg;
  const isNotAdmin = (props as AdminCheckResponse)?.isAdmin === false;
  useEffect(() => {
    if (isOccuerdError || isNotAdmin) {
      router.push("/no-page");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setPath(() => getPath(router.query));
  }, [router.query]);

  if (isOccuerdError || isNotAdmin) {
    return <div></div>;
  }

  return (
    <main className="w-full h-full">
      <AdminPageNavigator path={path} />
      {getPath(router.query).join("/") === "users/temporary" && (
        <TemporaryAccount />
      )}
      {getPath(router.query).join("/") === "users/user" && <AdminUser />}
      {getPath(router.query).join("/") === "storages/temp" && <TempStorage />}
    </main>
  );
};

export default AdminPage;

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user) {
    return { props: { status: 403, body: { msg: "Unauthorized" } } };
  }

  const adminCheckResponse = await response<AdminCheckResponse>(
    request(session?.user).get(`${process.env.BACKEND_ENDPOINT}/admin/check`)
  );

  return { props: { ...(adminCheckResponse.body as AdminCheckResponse) } };
}) satisfies GetServerSideProps<AdminCheckResponse | ErrorResponse>;
