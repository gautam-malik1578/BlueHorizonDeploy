import { useQuery } from "@tanstack/react-query";
import { getAllReviewsOnAttraction } from "../services/reviews";
import { useSelector } from "react-redux";

export function useReviews(attractionId) {
  const selectedCityId = useSelector((state) => state.curCity.cityId);
  const token = useSelector((state) => state.user.token);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["findAllReviews", attractionId],
    queryFn: async () => {
      const res = await getAllReviewsOnAttraction(
        selectedCityId,
        attractionId,
        token
      );
      return res;
    },
    // enabled: false,
  });

  console.log("the res is in the useQuery of userREVIEWS-->---->>>", data);
  return { refetch, data, isLoading };
}
