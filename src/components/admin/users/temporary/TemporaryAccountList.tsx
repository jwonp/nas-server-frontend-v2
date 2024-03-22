import { useQuery } from "@tanstack/react-query";
import { ErrorResponse, TemporaryAccountResponse } from "@/types/Responses";
import axios, { AxiosError, AxiosResponse } from "axios";
import TemporaryAccountListBar from "@/components/admin/users/temporary/TemporaryAccountListBar";
import { useMemo } from "react";

const TemporaryAccountList = () => {
  const temporaryAccountQuery = useQuery<
    TemporaryAccountResponse | ErrorResponse
  >({
    queryKey: ["temporary", "users"],
    queryFn: () =>
      axios
        .get("/api/admin/users/temporary")
        .then((res: AxiosResponse<TemporaryAccountResponse>) => res.data)
        .catch(
          (err: AxiosError<ErrorResponse>) =>
            err.response?.data as ErrorResponse
        ),
  });
  const TemporaryAccountListBars = useMemo(() => {
    if (temporaryAccountQuery.isLoading) {
      return <p className="p-2 text-white">임시 계정을 불러오는 중...</p>;
    }
    const isError = temporaryAccountQuery.error ? true : false;
    const isGotErrorResponse =
      temporaryAccountQuery.data &&
      Object.keys(temporaryAccountQuery.data).includes("msg");

    if (isError || isGotErrorResponse) {
      return (
        <p className="p-2 text-white">임시 계정을 불러오는데 실패헀습니다.</p>
      );
    }

    const accounts = (temporaryAccountQuery.data as TemporaryAccountResponse)
      .accounts;
    if (accounts.length === 0) {
      return <p className="p-2 text-white">생성된 임시 계정이 없습니다.</p>;
    }
    return accounts.map((account) => (
      <TemporaryAccountListBar
        key={`temporary-account-list-bar-${account.username}`}
        account={account}
      />
    ));
  }, [
    temporaryAccountQuery.data,
    temporaryAccountQuery.error,
    temporaryAccountQuery.isLoading,
  ]);
  return (
    <section className="p-6 bg-slate-800 rounded-lg mb-4">
      <h1 className="text-xl font-bold indent-2 text-white">임시 계정 목록</h1>
      <div className="mt-1 border-2 border-white rounded-full" />
      <article className="">{TemporaryAccountListBars}</article>
    </section>
  );
};
export default TemporaryAccountList;
