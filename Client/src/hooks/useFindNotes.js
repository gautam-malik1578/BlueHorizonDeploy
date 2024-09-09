import { useQuery } from "@tanstack/react-query";
import { getNoteonAttraction } from "../services/notes";
import { useSelector } from "react-redux";

export function useFindNotes(attractionId) {
  const selectedCityId = useSelector((state) => state.curCity.cityId);
  const token = useSelector((state) => state.user.token);
  const { data, isLoading, error } = useQuery({
    queryKey: ["findNote", attractionId],
    queryFn: async () => {
      const req = getNoteonAttraction(selectedCityId, attractionId, token);
      return req;
    },
  });
  return { data, isLoading, error };
}
