import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { findPopularAttractions } from "../services/popular";

export function useFindPopular() {
  const token = useSelector((state) => state.user.token);
  const max = 5;
  const { data, error, isLoading } = useQuery({
    queryKey: ["findPopularAttractions"],
    staleTime: 0,
    queryFn: async () => await findPopularAttractions(max, token),
  });
  return { data, error, isLoading };
}
