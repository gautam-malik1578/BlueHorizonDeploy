import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { deleteRepliyOnReview } from "../services/replies";
import toast from "react-hot-toast";

export function useDeleteReply(reviewId) {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.user.token);
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["deleteReview", reviewId],
    mutationFn: async (replyId) =>
      await deleteRepliyOnReview(reviewId, replyId, token),
    onSuccess: () => {
      // console.log("boi we are in sucess of deleteing a review a reply :;)))");
      queryClient.refetchQueries(["findReplies", reviewId]);
      toast.success("reply deleted sucessfully", {
        icon: "😎",
        style: { color: "var(--color-red)" },
      });
    },
  });
  return {
    mutate,
    isLoading,
    error,
  };
}
