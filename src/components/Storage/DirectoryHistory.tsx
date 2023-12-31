import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const DirectoryHistory = () => {
  
  const [historyList, setHistoryList] = useState<string[]>([
    "root",
    "folder",
    "folder2",
  ]);
  const historyBlocks = useMemo(() => {
    const handleHistoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const index = parseInt(e.currentTarget.id);
      setHistoryList(() => historyList.slice(0, index));
    };
    return historyList.map((history, index) => (
      <div
        id={`${index}`}
        key={index}
        onClick={handleHistoryClick}>{`/ ${history}`}</div>
    ));
  }, [historyList]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["history"],
    queryFn: () => axios.get(`/api/storage/${historyList.join("/")}`).then((response) => response.data),
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="p-2 text-white text-2xl font-semibold font-['Inter']">
      <div className="flex gap-2">{historyBlocks}</div>
    </div>
  );
};
// 네 알겠습니다!
export default DirectoryHistory;
