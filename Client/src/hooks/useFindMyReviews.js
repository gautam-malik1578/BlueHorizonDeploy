import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { findMyReviews } from "../services/reviews";

export function useFindMyReviews() {
  const token = useSelector((state) => state.user.token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["findMyReviews"],
    queryFn: async () => await findMyReviews(token),
  });
  return { data, error, isLoading };
}
