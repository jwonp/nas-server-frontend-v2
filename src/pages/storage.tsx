import VideoListBar from "@/components/Storage/ListBar/ListBarTemplates/VideoListBar";
import ImageListBar from "@/components/Storage/ListBar/ListBarTemplates/ImageListBar";
import FileListBar from "@/components/Storage/ListBar/ListBarTemplates/FileListBar";
import FolderListBar from "@/components/Storage/ListBar/ListBarTemplates/FolderListBar";

import ListColumnBar from "@/components/Storage/ListBar/ListColumnBar";
import DirectoryHistory from "@/components/Storage/DirectoryHistory";
import AddButtonList from "@/components/Storage/AddButtonList";

const StoragePage = () => {
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
        <FolderListBar
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
