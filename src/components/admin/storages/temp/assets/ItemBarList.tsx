import FileBar from "./FileBar";
import FolderBar from "./FolderBar";
import { DirectoryItemsEntry, TempFileItem } from "./utils";

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
  const key = 0;
  const value = 1;

  return entries.map((entry) => {
    if (Object.keys(entry[value]).includes("key")) {
      const file = entry[value] as TempFileItem;
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
    const folder = items.find((item) => item.key === entry[key]);

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
          entries={Object.entries(entry[value])}
          items={items}
          selectedItem={selectedItem}
          handleClickFileBar={handleClickFileBar}
          handleClickFolderBar={handleClickFolderBar}></ItemBarList>
      </FolderBar>
    );
  });
};

export default ItemBarList;
