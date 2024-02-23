import { useDirectory } from "@/hooks/useDirectory.hook";
import { DisplayHistoryResponse, ErrorResponse } from "@/types/Responses";
import { ERROR_RESPONSE } from "@/utils/strings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const DirectoryHistory = () => {
  const router = useRouter();
  const directory = useDirectory();
  const queryClient = useQueryClient();
  const historyQuery = useQuery<DisplayHistoryResponse | ErrorResponse>({
    queryKey: ["history", { path: directory }],
    queryFn: (): Promise<DisplayHistoryResponse | ErrorResponse> =>
      axios
        .get(`/api/storage/directory/history?path=${directory}`)
        .then((res: AxiosResponse<DisplayHistoryResponse>) => res.data)
        .catch(
          (err: AxiosError<ErrorResponse>) =>
            err.response?.data as ErrorResponse
        ),
    enabled: directory ? true : false,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["history", { path: directory }],
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
    if (historyQuery.isLoading || !historyQuery.data) {
      return <div>/</div>;
    }

    if (Object.keys(historyQuery.data).includes(ERROR_RESPONSE.msg)) {
      return <div></div>;
    }
    const historyList = router.query.history as string[];
    const displayHistoryMap = new Map<string, string>();
    (historyQuery.data as DisplayHistoryResponse).historys.forEach(
      (history) => {
        displayHistoryMap.set(history.key.split("folder$")[1], history.title);
      }
    );
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
