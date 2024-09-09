import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAreview } from "../services/reviews";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const useDeleteReviews = function (attractionId) {
  const queryClient = useQueryClient();
  // const selectedCityId = useSelector((state) => state.curCity.cityId);
  const token = useSelector((state) => state.user.token);

  const { data, mutate, isLoading, error } = useMutation({
    mutationKey: ["deleteReview"],
    mutationFn: async (reviewId) => {
      const res = await deleteAreview(reviewId, token);
      return res;
    },
    onSuccess: () => {
      console.log(
        "🎉🎉🎉🎉🎉🎉🎉 deleted the review now ro retecht the query:)))🎉🎉💥💥"
      );
      queryClient.refetchQueries(["findAllReviews", attractionId]);
      toast.success("review deleted sucessfully", {
        icon: "😎",
        style: { color: "var(--color-red)" },
      });
    },
  });
  return { queryClient, mutate, isLoading, data, error };
};
