import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAReviewOnAttraction } from "../services/reviews";
import { useSelector } from "react-redux";

export const useMakeReview = function (attractionId, setShowForm) {
  const queryClient = useQueryClient();
  const selectedCityId = useSelector((state) => state.curCity.cityId);
  const token = useSelector((state) => state.user.token);

  const { data, isLoading, mutate } = useMutation({
    mutationKey: ["createReview"],
    mutationFn: async (content) => {
      const data = await createAReviewOnAttraction(
        selectedCityId,
        attractionId,
        content,
        token
      );
      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(["findAllReviews", attractionId]);
      setShowForm(false);
    },
  });
  return { queryClient, data, isLoading, mutate };
};
