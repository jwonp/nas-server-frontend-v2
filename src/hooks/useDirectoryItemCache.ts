import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useDirectoryItemCache = <T = any>(querykey: QueryKey) => {
  const [cache, setCache] = useState<T>();
  const queryClient = useQueryClient();
  useEffect(() => {
    setCache(
      () =>
        queryClient.getQueryCache().get(JSON.stringify(querykey))?.state
          .data as T
    );
  }, [queryClient, querykey]);
  return cache;
};
export default useDirectoryItemCache;
