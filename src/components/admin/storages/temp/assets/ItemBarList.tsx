import FileBar from "./FileBar";
import FolderBar from "./FolderBar";
import { DirectoryItemsEntry, TempFileItem, isFile } from "./utils";

type ItemBarListProps = {
  entries: DirectoryItemsEntry[];
  items: TempFileItem[];
  selectedItem: string;
  handleClickFileBar: (e: React.MouseEvent) => void;
  handleClickFolderBar: (e: React.MouseEvent) => void;
};
const ItemBarList = ({
  entries,
  items,
  selectedItem,
  handleClickFileBar,
  handleClickFolderBar,
}: ItemBarListProps) => {
  const KEY = 0;
  const VALUE = 1;
  const sortedEntries = entries.sort((a, b) => {
    const [keyA, valueA] = a;
    const [keyB, valueB] = b;
    if (isFile(valueA) && !isFile(valueB)) {
      return 1;
    }
    if (isFile(valueB) && !isFile(valueA)) {
      return -1;
    }

    return 0;
  });

  return sortedEntries.map((entry) => {
    // 'key' refers to the file key used by S3 to upload
    // That is why 'isFile' checks the 'key' property in the object key
    const isFile = Object.keys(entry[VALUE]).includes("key");
    if (isFile) {
      const file = entry[VALUE] as TempFileItem;
      return (
        <FileBar
          id={`file%${file.directory}%${file.key}`}
          key={`file%${file.directory}%${file.key}`}
          title={file.fileName}
          selectedItem={selectedItem}
          isSaved={file.isSaved}
          depth={file.directory.split("/").length - 2}
          onClick={handleClickFileBar}
        />
      );
    }
    const folder = items.find((item) => item.key === entry[KEY]);

    if (!folder) {
      return <></>;
    }

    return (
      <FolderBar
        id={`folder%${folder.directory}%${folder.key}`}
        key={`folder%${folder.directory}%${folder.key}`}
        title={folder.fileName}
        isSaved={folder.isSaved}
        selectedItem={selectedItem}
        depth={folder.directory.split("/").length - 2}
        onClick={handleClickFolderBar}>
        <ItemBarList
          entries={Object.entries(entry[VALUE])}
          items={items}
          selectedItem={selectedItem}
          handleClickFileBar={handleClickFileBar}
          handleClickFolderBar={handleClickFolderBar}></ItemBarList>
      </FolderBar>
    );
  });
};

export default ItemBarList;
