import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MetaData } from "@/types/MetaData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { useDirectory } from "@/hooks/useDirectory.hook";
import { ERROR_RESPONSE } from "@/utils/strings";
import { ErrorResponse, ItemResponse } from "@/types/Responses";
import FolderAddButton from "../../Storage/AddButton/FolderAddButton";
import FileAddButton from "../../Storage/AddButton/FileAddButton";
type AddButtonListProps = {
  histories?: string[];
};
const AddIconSize = 38;

const AddButtonList = ({ histories }: AddButtonListProps) => {
  const [isEnableButtons, setIsEnableButtons] = useState<boolean>(false);

  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const directory = useDirectory();
  const ItemQuery = useQuery<ItemResponse | ErrorResponse>({
    queryKey: ["item", { path: directory }],
    queryFn: async () =>
      axios
        .get(`/api/storage/item/${directory}`)
        .then((res: AxiosResponse<ItemResponse>) => res.data)
        .catch(
          (err: AxiosError<ErrorResponse>) =>
            err.response?.data as ErrorResponse
        ),
    throwOnError: false,
  });

  const addMetas = useMutation({
    mutationFn: (metas: MetaData[]) =>
      axios.post("/api/storage/meta", { metas: metas }),
    onSuccess: (_, variables) => {
      const mutations = variables.map((item) => {
        const { ownerId: _, ...rest } = item;
        return rest;
      });
      return mutations;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["volume"] });
      queryClient.invalidateQueries({
        queryKey: ["item", { path: directory }],
      });
    },
  });

  useEffect(() => {
    if (!ItemQuery.data) {
      return setIsEnableButtons(() => false);
    }
    if (Object.keys(ItemQuery.data).includes(ERROR_RESPONSE.msg)) {
      return setIsEnableButtons(() => false);
    }
    setIsEnableButtons(() => true);
  }, [ItemQuery.data]);
  return (
    <div
      className={`grid grid-cols-2 select-none ${
        isEnableButtons ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
      }`}>
      <FolderAddButton
        userId={session?.user.id}
        history={histories}
        mutate={addMetas.mutate}
        AddIconSize={AddIconSize}
        isEnableButtons={isEnableButtons}
      />
      <FileAddButton
        userId={session?.user.id}
        history={histories}
        mutate={addMetas.mutate}
        AddIconSize={AddIconSize}
        isEnableButtons={isEnableButtons}
      />
    </div>
  );
};

export default AddButtonList;
