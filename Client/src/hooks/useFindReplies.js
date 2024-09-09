import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { findRepliesOnAReview } from "../services/replies";

export function useFindReplies(reviewId) {
  const token = useSelector((state) => state.user.token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["findReplies", reviewId],
    queryFn: async () => await findRepliesOnAReview(reviewId, token),
  });
  return { data, error, isLoading };
}
