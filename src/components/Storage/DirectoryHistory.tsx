import Link from "next/link";
import { useRouter } from "next/router";
import {  useMemo } from "react";

const DirectoryHistory = () => {
  const router = useRouter();
  const historyList = useMemo(() => {
    let history = router.query.history as string[] | null;

    return history;
  }, [router]);

  const historyBlocks = useMemo(() => {
    if (!historyList) {
      return <div>/</div>;
    }

    return historyList.map((history, index) => (
      <Link
        id={`${index}`}
        key={index}
        href={`/storage/${historyList
          .slice(0, index + 1)
          .join("/")}`}>{`/ ${history}`}</Link>
    ));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyList]);


  return (
    <div className="p-2 text-white text-2xl font-semibold font-['Inter']">
      <div className="flex gap-2">{historyBlocks}</div>
    </div>
  );
};
// 네 알겠습니다!
export default DirectoryHistory;
