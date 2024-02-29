import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDirectory } from "@/hooks/useDirectory.hook";
import { ERROR_RESPONSE } from "@/utils/strings";
import { ErrorResponse, ItemResponse } from "@/types/Responses";
import FolderAddButton from "./FolderAddButton";
import FileAddButton from "./FileAddButton";
type AddButtonListProps = {
  histories?: string[];
};
const AddIconSize = 38;

const AddButtonList = ({ histories }: AddButtonListProps) => {
  const [isEnableButtons, setIsEnableButtons] = useState<boolean>(false);
  const { data: session } = useSession();
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
        AddIconSize={AddIconSize}
        isEnableButtons={isEnableButtons}
      />
      <FileAddButton
        userId={session?.user.id}
        history={histories}
        AddIconSize={AddIconSize}
        isEnableButtons={isEnableButtons}
      />
    </div>
  );
};

export default AddButtonList;
