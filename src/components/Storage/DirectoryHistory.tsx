import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const DirectoryHistory = () => {
  const router = useRouter();


  const historyBlocks = useMemo(() => {
    const historyList =  router.query.history as string[] | null;
    if (!historyList) {
      return (
        <Link
          id={"0"}
          href={`/storage`}>{`/ 내 드라이브`}</Link>
      );
    }

    return ["내 드라이브", ...historyList].map((history, index) => {
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
  }, [router]);

  return (
    <div className="p-2 text-white text-2xl font-semibold font-['Inter']">
      <div className="flex gap-2">{historyBlocks}</div>
    </div>
  );
};
// 네 알겠습니다!
export default DirectoryHistory;
