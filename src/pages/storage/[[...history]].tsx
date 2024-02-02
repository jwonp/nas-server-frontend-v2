import ListColumnBar from "@/components/Storage/ListBar/ListColumnBar";
import DirectoryHistory from "@/components/Storage/DirectoryHistory";
import AddButtonList from "@/components/Storage/AddButtonList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import { ItemResponse } from "@/types/MetaData";
import { useAppDispatch } from "@/redux/hooks";
import { getTimeString } from "@/utils/parseTime";
import { convertFileSize } from "@/utils/parseFileSize";
import { IsExistDirectoryResponse } from "@/types/Responses";
import ListBar from "@/components/Storage/ListBar/ListBar";

// ItemQuery.data -> itemList -> itemElements => render
const StoragePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const directory = useCallback(
    (type: "string" | "array", exceptionString?: string) => {
      let exception = "/";
      if (exceptionString) {
        exception = exceptionString;
      }
      if (type === "string") {
        return (router.query.history as string[])
          ? (router.query.history as string[]).join("/")
          : exception;
      }
      return (router.query.history as string[])
        ? [(router.query.history as string[]).join("/")]
        : [exception];
    },
    [router.query]
  );
  const isExistDirectoryQuery = useQuery<IsExistDirectoryResponse>({
    queryKey: ["isExist", { path: directory("array") }],
    queryFn: () =>
      axios
        .get(`/api/storage/directory/check?path=${directory("string", "")}`)
        .then((response) => response.data),
  });

  const ItemQuery = useQuery<ItemResponse>({
    queryKey: ["item", directory("array") as string[]],
    queryFn: () =>
      axios
        .get(`/api/storage/item/${directory("string", "")}`)
        .then((response) => response.data),
  });

  const userIconQuery = useQuery({
    queryKey: ["profileIcon"],
    queryFn: (): Promise<{ url: string }> =>
      axios
        .get(`/api/download?key=${ItemQuery.data?.image}`)
        .then((response) => response.data),
    enabled: ItemQuery.data?.image ? true : false,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["isExist", { path: directory("array") }],
    });
    queryClient.invalidateQueries({
      queryKey: ["item", directory("array") as string[]],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
  useEffect(() => {
    if (
      isExistDirectoryQuery.data &&
      !isExistDirectoryQuery.data.isExistDirectory
    ) {
      router.push("/storage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExistDirectoryQuery.data]);

  const itemElements = useMemo(() => {
    if (ItemQuery.isLoading) {
      return <div>Loading...</div>;
    }
    if (!ItemQuery.data) {
      return <div>Error to load files</div>;
    }
    if (ItemQuery.data && ItemQuery.data.files.length === 0) {
      return <div>No files</div>;
    }
    console.log(ItemQuery.data.files.map((file) => file.fileName));
    return ItemQuery.data.files.map((meta, index) => {
      const metas = {
        fileId: meta.key,
        uploadTime: getTimeString(meta.uploadTime),
        title: meta.fileName,
        owner: ItemQuery.data.username,
        ownerImage: ItemQuery.data.image,
        fileIcon: meta.type,
        fileSize: convertFileSize(meta.size),
      };
      return (
        <ListBar
          key={index}
          {...metas}
        />
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemQuery.data]);

  //132 43
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-10">
          <DirectoryHistory />
        </div>
        <div className="col-span-2">
          <AddButtonList />
        </div>
      </div>

      <ListColumnBar />
      <div className="w-full h-[calc(100vh-56px-132px)] max-h-[calc(100vh-56px-132px)] overflow-scroll overflow-x-hidden">
        {itemElements}
      </div>
    </div>
  );
};

export default StoragePage;
