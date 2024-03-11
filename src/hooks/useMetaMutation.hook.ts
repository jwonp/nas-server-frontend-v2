import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDirectory } from "./useDirectory.hook";
import { MetaData } from "@/types/MetaData";
import axios from "axios";

export const useMetaMutation = () => {
  const queryClient = useQueryClient();
  const directory = useDirectory();
  const addMetas = useMutation({
    mutationFn: (metas: Omit<MetaData,"isFavorite"> []) =>
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
  return addMetas;
};
