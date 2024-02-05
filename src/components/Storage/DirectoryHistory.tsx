import { DisplayHistoryResponse } from "@/types/Responses";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const DirectoryHistory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const historyQuery = useQuery({
    queryKey: ["history", { query: (router.query.history as string[]) ?? [] }],
    queryFn: (): Promise<DisplayHistoryResponse[]> =>
      axios
        .get(
          `/api/storage/directory/history?path=${
            "/" + (router.query.history as string[])?.join("/")
          }`
        )
        .then((res) => res.data),
    enabled: (router.query.history as string[]) ? true : false,
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [
        "history",
        { query: (router.query.history as string[]) ?? [] },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
  const historyBlocks = useMemo(() => {
    if (!router.query.history || router.query.history.length === 0) {
      return (
        <Link
          id={"0"}
          href={`/storage`}>{`/ 내 드라이브`}</Link>
      );
    }
    if (historyQuery.isLoading) {
      return <div>/</div>;
    }
    const historyList = router.query.history as string[];
    const displayHistoryMap = new Map<string, string>();
    historyQuery.data?.forEach((history) => {
      displayHistoryMap.set(history.key.split("folder$")[1], history.title);
    });
    const displayHistories = (router.query.history as string[]).map((hisotry) =>
      displayHistoryMap.get(hisotry)
    );


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
          href={`/storage/${historyList
            .slice(0, index)
            .join("/")}`}>{`/ ${history}`}</Link>
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyQuery.data]);

  return (
    <div className="p-2 text-white text-2xl font-semibold font-['Inter']">
      <div className="flex gap-2">{historyBlocks}</div>
    </div>
  );
};
// 네 알겠습니다!
export default DirectoryHistory;
