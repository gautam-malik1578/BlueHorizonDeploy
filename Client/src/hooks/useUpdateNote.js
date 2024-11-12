import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { updateANote } from "../services/notes";
import toast from "react-hot-toast";

export const useUpdatenotes = function (attractionId) {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.user.token);

  const { data, mutate, isLoading, error } = useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: async ({ noteId, content, action }) => {
      // console.log(
      //   "the value of the content in the mutaton fun is on update note ----<<<>>>.",
      //   content
      // );
      const res = await updateANote(noteId, content, action, token);
      return res;
    },
    onSuccess: () => {
      console.log(
        "🎉🎉🎉🎉🎉🎉🎉 updated the  the note now ro retecht the query:)))🎉🎉💥💥"
      );
      queryClient.refetchQueries(["findNote", attractionId]);
      toast.success("note updated sucessfully", {
        icon: "👍",
        style: { color: "var(--color-green)" },
      });
    },
  });
  return { queryClient, mutate, isLoading, data, error };
};
