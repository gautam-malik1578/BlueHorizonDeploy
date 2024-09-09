import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { findMyFavs } from "../services/favs";

export function useFindMyFavs() {
  const token = useSelector((state) => state.user.token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["findMyfavs"],
    queryFn: async () => await findMyFavs(token),
  });
  return { data, error, isLoading };
}
