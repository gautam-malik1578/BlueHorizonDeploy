import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchMyInfo } from "../services/user";

export function useFindMe() {
  const token = useSelector((state) => state.user.token);
  const { data, isLoading, error } = useQuery({
    queryKey: ["findMe", token],
    queryFn: async () => await fetchMyInfo(token),
  });

  return { data, isLoading, error };
}
