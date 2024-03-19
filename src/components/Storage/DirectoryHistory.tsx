import { DisplayHistory, Item } from "@/types/ComponentTypes";
import {
  ERROR_RESPONSE,
  HISTORY_BLOCKS_FAIL_TO_LOAD_HISTORIES,
  ROOT_DISPLAY_DIRECTORY,
} from "@/utils/strings";
import Link from "next/link";
import { useMemo } from "react";
type DirectoryHistoryProps = {
  rowHistories: string[];
  initHistories?: DisplayHistory[];
  histories?: DisplayHistory[];
  items?: Item;

  isLoading: boolean;
};
const DirectoryHistory = ({
  rowHistories,
  initHistories,
  histories,
  isLoading,
  items,
}: DirectoryHistoryProps) => {
  const createDisplayHistoryMap = (historyData: DisplayHistory[]) => {
    const displayHistoryMap = new Map<string, string>();
    historyData.forEach((history) => {
      displayHistoryMap.set(history.key.split("folder$")[1], history.title);
    });
    return displayHistoryMap;
  };
  const matchHistory = (
    rowHistories: string[],
    displayHistoryMap: Map<string, string>
  ) => {
    return rowHistories
      .map<string>((history) => {
        const historyValue = displayHistoryMap.get(history);
        if (historyValue !== undefined) {
          return historyValue;
        }
        return "";
      })
      .filter((history) => history !== "");
  };
  const generateHistoryBlock = (displayHistories: string[]) => {
    return ["내 드라이브", ...displayHistories].map((history, index) => {
      if (index === 0) {
        return (
          <Link
            id={`${index}`}
            key={index}
            href={`/storage`}>{`/ ${history}`}</Link>
        );
      }
      return (
        <Link
          id={`${index}`}
          key={index}
          href={`/storage/${(rowHistories ?? [])
            .slice(0, index)
            .join("/")}`}>{`/ ${history}`}</Link>
      );
    });
  };
  const historyBlocks = useMemo(() => {
    const isRootDirectory = !rowHistories || rowHistories.length === 0;
    const isNoHistories = histories === undefined;
    const isNoInitHistories = initHistories === undefined;
    if (items && Object.keys(items).includes(ERROR_RESPONSE.msg)) {
      return <div>{HISTORY_BLOCKS_FAIL_TO_LOAD_HISTORIES}</div>;
    }

    if (isLoading === true && isNoInitHistories === false) {
      const displayHistoryMap = createDisplayHistoryMap(initHistories);
      const displayHistories = matchHistory(rowHistories, displayHistoryMap);
      return generateHistoryBlock(displayHistories);
    }
    
    if (isRootDirectory || isNoHistories) {
      return (
        <Link
          id={"0"}
          href={`/storage`}>
          {ROOT_DISPLAY_DIRECTORY}
        </Link>
      );
    }

    const displayHistoryMap = createDisplayHistoryMap(histories);
    const displayHistories = matchHistory(rowHistories, displayHistoryMap);
    return generateHistoryBlock(displayHistories);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [histories]);

  return (
    <div className="p-2 text-white text-2xl font-semibold font-['Inter']">
      <div className="flex flex-wrap gap-2">{historyBlocks}</div>
    </div>
  );
};

export default DirectoryHistory;
