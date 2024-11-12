import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { updateReplyOnReview } from "../services/replies";
import toast from "react-hot-toast";

export function useUpdateReply(reviewId) {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.user.token);
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["updateReview", reviewId],
    mutationFn: async (data) =>
      await updateReplyOnReview(reviewId, data.replyId, data.content, token),
    onSuccess: () => {
      // console.log("boi we are in sucess of deleteing a review a reply :;)))");
      queryClient.refetchQueries(["findReplies", reviewId]);
      toast.success("reply updated sucessfully", {
        icon: "👍",
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
