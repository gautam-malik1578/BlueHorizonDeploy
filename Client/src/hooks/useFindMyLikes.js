import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { findMyLikedAttraction } from "../services/likes";

export function useFindMyLikes() {
  const token = useSelector((state) => state.user.token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["findMyLikes"],
    queryFn: async () => await findMyLikedAttraction(token),
  });
  return { data, error, isLoading };
}
