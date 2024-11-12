import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAreview } from "../services/reviews";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const useUpdateReviews = function (attractionId, setShowUpdateForm) {
  const queryClient = useQueryClient();
  // const selectedCityId = useSelector((state) => state.curCity.cityId);
  const token = useSelector((state) => state.user.token);

  const { data, mutate, isLoading, error } = useMutation({
    mutationKey: ["deleteReview"],
    mutationFn: async ({ id, content }) => {
      // console.log(
      //   "the value of the content in the mutaton fun is ----<<<>>>.",
      //   content
      // );
      const res = await updateAreview(id, content, token);
      return res;
    },
    onSuccess: () => {
      // console.log(
      //   "🎉🎉🎉🎉🎉🎉🎉 updated the  the review now ro retecht the query:)))🎉🎉💥💥"
      // );
      queryClient.refetchQueries(["findAllReviews", attractionId]);
      queryClient.invalidateQueries(["findMyReviews"]);
      toast.success("review updated sucessfully", {
        icon: "👍",
        style: { color: "var(--color-green)" },
      });
      setShowUpdateForm(false);
    },
  });
  return { queryClient, token, mutate, isLoading, data, error };
};
