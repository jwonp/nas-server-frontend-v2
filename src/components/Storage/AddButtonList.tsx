import Image from "next/image";
import addFolderIcon from "@public/icons/addFolder.png";
import addFileIcon from "@public/icons/addFile.png";
const AddIconSize = 38;
const AddButtonList = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 py-1 flex rounded-l-lg border-l border-r border-t border-b">
        <div className="mx-auto">
          <Image
            src={addFolderIcon}
            alt=""
            width={AddIconSize}
            height={AddIconSize}
          />
        </div>
      </div>
      <div className="col-span-1 py-1 flex rounded-r-lg border-r border-t border-b">
        <div className="mx-auto">
          <Image
            src={addFileIcon}
            alt=""
            width={AddIconSize}
            height={AddIconSize}
          />
        </div>
      </div>
    </div>
  );
};

export default AddButtonList;
