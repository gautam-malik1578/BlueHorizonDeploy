import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createReplieOnReview } from "../services/replies";
import toast from "react-hot-toast";

export function useCreateReply(reviewId) {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.user.token);
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["createReview", reviewId],
    mutationFn: async (content) =>
      await createReplieOnReview(reviewId, content, token),
    onSuccess: () => {
      console.log("boi we are in sucess of creating a reply :;)))");
      queryClient.refetchQueries(["findReplies", reviewId]);
      toast.success("reply created sucessfully", {
        icon: "😁",
        style: { color: "var(--color-green)" },
      });
    },
  });
  return {
    mutate,
    isLoading,
    error,
  };
}
