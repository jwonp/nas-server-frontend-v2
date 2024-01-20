import ListColumnBar from "@/components/Storage/ListBar/ListColumnBar";
import DirectoryHistory from "@/components/Storage/DirectoryHistory";
import AddButtonList from "@/components/Storage/AddButtonList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ItemResponse, MetaData } from "@/types/MetaData";
import ListBarGenerator from "@/components/Storage/ListBar/ListBarGenerator";
import VideoListBar from "@/components/Storage/ListBar/ListBarTemplates/VideoListBar";

const StoragePage = () => {
  const router = useRouter();
  const [itemList, setItemList] = useState<Omit<MetaData, "ownerId">[]>([]);
  const { isLoading, error, data } = useQuery<ItemResponse>({
    queryKey: (router.query.history as string[]) ?? ["/"],
    queryFn: () =>
      axios
        .get(
          `/api/storage/item/${
            router.query.history
              ? (router.query.history as string[]).join("/")
              : ""
          }`
        )
        .then((response) => response.data),
  });
  const userIconQuery = useQuery({
    queryKey: ["profileIcon"],
    queryFn: (): Promise<{ url: string }> =>
      axios
        .get(`/api/download?key=${data?.image}`)
        .then((response) => response.data),
    enabled: data?.image ? true : false,
  });
  useEffect(() => {
    if (data) {
      setItemList(() => [...data.files]);
    }
  }, [data]);
  const itemElements = useMemo(() => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!data) {
      return <div>Error to load files</div>;
    }
    if (data && data.files.length === 0) {
      return <div>No files</div>;
    }
    return itemList.map((meta, index) => (
      <ListBarGenerator
        key={index}
        userId={data.id}
        username={data.username}
        userIcon={userIconQuery?.data?.url}
        meta={meta}
      />
    ));
  }, [data, isLoading, itemList, userIconQuery?.data?.url]);
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
        {/*       <FolderListBar
          title={"폴더 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={null}
          fileSize={null}
        /><FolderListBar
          title={"폴더 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={null}
          fileSize={null}
        />
        <FileListBar
          title={"파일 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={"2023.01.01"}
          fileSize={"3KB"}
        />
        <ImageListBar
          title={"이미지 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={"2023.01.01"}
          fileSize={"20MB"}
        />
        <VideoListBar
          title={"비디오 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={"2023.01.01"}
          fileSize={"2.3GB"}
        />
        <VideoListBar
          title={"비디오 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={"2023.01.01"}
          fileSize={"2.3GB"}
        />
        <VideoListBar
          title={"비디오 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={"2023.01.01"}
          fileSize={"2.3GB"}
        />
        <VideoListBar
          title={"비디오 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={"2023.01.01"}
          fileSize={"2.3GB"}
        />
       */}
        <VideoListBar
          title={"비디오 제목"}
          owner={"소유자"}
          ownerImage={null}
          uploadTime={"2023.01.01"}
          fileSize={"2.3GB"}
        /> 
      </div>
    </div>
  );
};

export default StoragePage;
