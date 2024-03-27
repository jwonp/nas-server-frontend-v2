import DirectoryHistory from "@/components/Storage/DirectoryHistory";
import AddButtonList from "@/components/Storage/AddButton/AddButtonList";
import axios from "axios";
import {
  ItemResponse,
  ErrorResponse,
  AdminCheckResponse,
} from "@/types/Responses";

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { request, response } from "@/utils/request";
import { useRouter } from "next/router";
import {
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDirectory } from "@/hooks/useDirectory.hook";
import { useEffect, useState } from "react";
import WarningSnackBar from "@/components/Storage/SnackBar/WarningSnackBar";
import ProgressSnackBar from "@/components/Storage/SnackBar/ProgressSnackBar";

import FilelistContainer from "@/components/Storage/FileList/FileListContainer";
import { useSession } from "next-auth/react";
import ShareModal from "@/components/Storage/Modal/ShareModal";
import Link from "next/link";
import { MetaData } from "@/types/MetaData";
import { DisplayHistory, Item } from "@/types/ComponentTypes";
import VideoPlayerModal from "@/components/Storage/Modal/MediaModal/Video/VideoPlayerModal";
import ImageViewerModal from "@/components/Storage/Modal/MediaModal/Image/ImageViewerModal";
type StoragePageProps = {
  isAdmin: AdminCheckResponse | ErrorResponse;
};
// ItemQuery.data -> itemList -> itemElements => render
const StoragePage = ({
  isAdmin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const directory = useDirectory();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [items, setItems] = useState<Item | undefined>(undefined);
  const [histories, setHistories] = useState<DisplayHistory[]>([]);

  const ItemQuery = useQuery<ItemResponse>({
    queryKey: ["item", { path: directory }],
    queryFn: () =>
      axios.get(`/api/storage/item/${directory}`).then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: "always",
    throwOnError: false,
    retry: 5,
    refetchInterval: false,
  });
  const itemVariables = useMutationState<Omit<MetaData, "isFavorite">[]>({
    filters: { mutationKey: ["addMetas"], status: "pending", exact: true },
    select: (mutation) =>
      mutation.state.variables as Omit<MetaData, "isFavorite">[],
  });
  useEffect(() => {
    if (!items) {
      return;
    }

    setItems((prev) => {
      const tempItems: Omit<MetaData, "ownerId">[] = [];
      itemVariables.forEach((vars) => {
        vars.forEach((v) => {
          const { ownerId, ...tmpVar } = v;
          const tmpItem = { ...tmpVar, isFavorite: false, isPending: true };
          tempItems.push(tmpItem);
        });
      });

      const newItems: Item = {
        ...(prev as Item),
        files: [...(prev as Item).files, ...tempItems],
      };
      return newItems;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemVariables]);

  useEffect(() => {
    if (ItemQuery.data) {
      setItems(() => ItemQuery.data.items);
      setHistories(() => ItemQuery.data.histories);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemQuery.data]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["item", { path: directory }],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div className="mx-auto w-full max-w-[1440px] min-w-[360px]">
      <div className="w-full h-full min-w-[360px] max-w-[1440px]">
        {(isAdmin as AdminCheckResponse).isAdmin === true && (
          <section className="m-2 px-4 py-2 bg-green-700 rounded-lg">
            <div className="flex">
              <p className="text-white mr-1">{`관리자 계정으로 로그인했습니다. 이`}</p>
              <p className="text-white underline underline-offset-1">
                <Link href={"/admin"}>{`링크`}</Link>
              </p>
              <p className="text-white">
                를 클릭해서 관리자 페이지로 이동할 수 있습니다.
              </p>
            </div>
          </section>
        )}

        <section className="grid grid-cols-12 mt-5">
          <div className="col-span-10 max-md:col-span-9">
            <DirectoryHistory
              rowHistories={(router.query.history as string[]) ?? []}
              histories={histories}
              
              isOnError={ItemQuery.isError}
            />
          </div>
          <div className="col-span-2 max-md:col-span-3">
            <AddButtonList
              histories={(router.query.history as string[]) ?? []}
              isItemFetched={ItemQuery.isSuccess}
              isOnError={ItemQuery.isError}
            />
          </div>
        </section>

        <FilelistContainer
          isLoading={ItemQuery.isLoading}
          userId={session?.user.id}
          directory={directory}
          isOnError={ItemQuery.isError}
          isInvalidDirectory={
            (ItemQuery.data as unknown as ErrorResponse)?.status === 404
          }
          items={items}
        />
        <ProgressSnackBar />
        <WarningSnackBar />
      </div>

      <ShareModal />
      <VideoPlayerModal />
      <ImageViewerModal />
    </div>
  );
};

export default StoragePage;

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user) {
    return {
      props: {
        isAdmin: { status: 403, body: { msg: "Unauthorized" } },
      },
    };
  }

  // admin check
  const adminCheckResponse = await response<AdminCheckResponse>(
    request(session?.user).get(`${process.env.BACKEND_ENDPOINT}/admin/check`)
  );

  return {
    props: {
      isAdmin: { ...(adminCheckResponse.body as AdminCheckResponse) },
    },
  };
}) satisfies GetServerSideProps<StoragePageProps | ErrorResponse>;
