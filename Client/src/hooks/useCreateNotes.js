import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createANoteOnAttraction } from "../services/notes";
import toast from "react-hot-toast";

export const useCreateNote = function (attractionId) {
  const queryClient = useQueryClient();
  const selectedCityId = useSelector((state) => state.curCity.cityId);
  const token = useSelector((state) => state.user.token);

  const { data, isLoading, mutate } = useMutation({
    mutationKey: ["createNote"],
    mutationFn: async (content) => {
      const data = await createANoteOnAttraction(
        selectedCityId,
        attractionId,
        content,
        token
      );
      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(["findNote", attractionId]);
      toast.success("note created sucessfully", {
        icon: "😁",
        style: { color: "var(--color-green)" },
      });
    },
  });
  return { queryClient, data, isLoading, mutate };
};
