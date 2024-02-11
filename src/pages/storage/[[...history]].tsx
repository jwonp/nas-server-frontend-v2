import ListColumnBar from "@/components/Storage/ListBar/ListColumnBar";
import DirectoryHistory from "@/components/Storage/DirectoryHistory";
import AddButtonList from "@/components/Storage/AddButtonList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { ItemResponse } from "@/types/MetaData";
import { getTimeString } from "@/utils/parseTime";
import { IsExistDirectoryResponse } from "@/types/Responses";
import ListBar from "@/components/Storage/ListBar/ListBar";
import { useAppSelector } from "@/redux/hooks";
import {
  getFileAmount,
  getProgressPercent,
} from "@/redux/featrues/fileLoadProgressSlice";
import {
  useDirectory,
  useDirectoryArray,
} from "@/components/hooks/useDirectory.hook";

// ItemQuery.data -> itemList -> itemElements => render
const StoragePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const directoryArray = useDirectoryArray();
  const directory = useDirectory();
  const progressPercent = useAppSelector(getProgressPercent);
  const fileAmount = useAppSelector(getFileAmount);
  const isExistDirectoryQuery = useQuery<IsExistDirectoryResponse>({
    queryKey: ["isExist", { path: directoryArray }],
    queryFn: async () =>
      axios
        .get(`/api/storage/directory/check?path=${directory}`)
        .then((response) => response.data),
  });

  const ItemQuery = useQuery<ItemResponse>({
    queryKey: ["item", { path: directoryArray }],
    queryFn: async () =>
      axios
        .get(`/api/storage/item/${directory}`)
        .then((response) => response.data),
  });

  useEffect(() => {
    console.log(
      `${fileAmount.fileCurrentAmount}/${fileAmount.fileTotalAmount} : ${progressPercent}%`
    );
  }, [progressPercent, fileAmount]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["isExist", { path: directoryArray }],
    });
    queryClient.invalidateQueries({
      queryKey: ["item", directoryArray],
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

    return ItemQuery.data.files.map((meta, index) => {
      const metas = {
        fileId: meta.key,
        uploadTime: getTimeString(meta.uploadTime),
        title: meta.fileName,
        owner: ItemQuery.data.username,
        ownerImage: ItemQuery.data.image,
        fileIcon: meta.type,
        fileSize: meta.size,
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

  return (
    <div className="w-full h-full min-w-[360px]">
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-10 max-md:col-span-9">
          <DirectoryHistory />
        </div>
        <div className="col-span-2 max-md:col-span-3">
          <AddButtonList />
        </div>
      </div>

      <ListColumnBar />
      <div className="w-full h-[calc(100vh-56px-132px)] max-h-[calc(100vh-56px-132px)] overflow-scroll overflow-x-hidden">
        {itemElements}
      </div>
      <div className={`${fileAmount.fileTotalAmount < 0 && "hidden"}`}>
        <div className="fixed bottom-[10px] right-[15px] text-white w-[300px] h-[50px] py-[7px] px-4 leading-9 bg-slate-500 rounded-lg">
          {`${fileAmount.fileCurrentAmount}/${fileAmount.fileTotalAmount}번쨰 ${progressPercent}% 진행중`}
        </div>
      </div>
    </div>
  );
};

export default StoragePage;
