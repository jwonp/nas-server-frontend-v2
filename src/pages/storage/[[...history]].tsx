import DirectoryHistory from "@/components/Storage/DirectoryHistory";
import AddButtonList from "@/components/Storage/AddButton/AddButtonList";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ItemResponse } from "@/types/Responses";
import { ErrorResponse } from "@/types/Responses";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { request } from "@/utils/request";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDirectory } from "@/hooks/useDirectory.hook";
import { useEffect } from "react";
import WarningSnackBar from "@/components/Storage/SnackBar/WarningSnackBar";
import ProgressSnackBar from "@/components/Storage/SnackBar/ProgressSnackBar";

import FilelistContainer from "@/components/Storage/FileList/FileListContainer";
import { useSession } from "next-auth/react";

// ItemQuery.data -> itemList -> itemElements => render
const StoragePage = (
  initItems: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const directory = useDirectory();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const ItemQuery = useQuery<ItemResponse | ErrorResponse>({
    queryKey: ["item", { path: directory }],
    queryFn: async () =>
      axios
        .get(`/api/storage/item/${directory}`)
        .then((res: AxiosResponse<ItemResponse>) => res.data)
        .catch(
          (err: AxiosError<ErrorResponse>) =>
            err.response?.data as ErrorResponse
        ),
    throwOnError: false,
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["item", { path: directory }],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div className="mx-auto w-full max-w-[1440px] min-w-[360px]">
      <div className="w-full h-full min-w-[360px] max-w-[1440px]">
        <div className="grid grid-cols-12 mt-5">
          <div className="col-span-10 max-md:col-span-9">
            <DirectoryHistory
              rowHistories={(router.query.history as string[]) ?? []}
              initHistories={(initItems as ItemResponse)?.histories}
              histories={(ItemQuery.data as ItemResponse)?.histories}
              isLoading={ItemQuery.isLoading}
              items={(initItems as ItemResponse)?.items}
            />
          </div>
          <div className="col-span-2 max-md:col-span-3">
            <AddButtonList
              histories={(router.query.history as string[]) ?? []}
            />
          </div>
        </div>

        <FilelistContainer
          isLoading={ItemQuery.isLoading}
          initItems={initItems}
          data={ItemQuery.data}
          userId={session?.user.id}
          directory={directory}
        />
        <ProgressSnackBar />
        <WarningSnackBar />
      </div>

      <ShareModal />
    </div>
  );
};

export default StoragePage;

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user) {
    return { props: { status: 403, msg: "Unauthorized" } };
  }

  let history = "/";

  if (context.query.history) {
    history = `/${(context.query.history as string[]).join("/")}`;
  }
  const itemResponse: ItemResponse | ErrorResponse = await request(
    session?.user
  )
    .get(`${process.env.BACKEND_ENDPOINT}/storage/item?path=${history}`)
    .then((res: AxiosResponse<ItemResponse>) => {
      return res.data;
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error: ErrorResponse = {
        status: err.status ?? 400,
        msg: err.response?.data.error ?? "Unknown Error",
      };

      return error;
    });

  return { props: { ...itemResponse } };
}) satisfies GetServerSideProps<ItemResponse | ErrorResponse>;
