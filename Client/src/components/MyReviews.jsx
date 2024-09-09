import { useFindMyReviews } from "../hooks/useFindMyReviews";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteReviews } from "../hooks/useDeleteReviews";
import Loader from "./Loader";
import styles from "./MyReviews.module.css";
import NotFound from "./NotFound";
import Tags from "./Tags";
import toast from "react-hot-toast";
import MyReview from "./MyReview";
function MyReviews() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useFindMyReviews();
  const {
    mutate: deleteReview,
    isLoading: deleting,
    error: deletingError,
  } = useDeleteReviews("");
  function handleViewAttraction() {
    toast.success("working on feature", {
      icon: "🔨",
      style: { color: "var(--color-red)" },
    });
  }
  function handleDeleteReview(id, attractionId) {
    console.log("we are sending the delete mutate with ,", id);
    deleteReview(id, {
      onSuccess: () => {
        console.log(
          "we deleted the review successfully and here in delete handel fun"
        );
        queryClient.refetchQueries(["findMyReviews"]);
        queryClient.invalidateQueries(["findAllReviews", attractionId]);
      },
    });
  }
  console.log(data);
  if (isLoading) {
    return <Loader />;
  }
  if (data.data.reviews.length === 0) {
    return <NotFound text="you nave no reviews yet" height={100} width={100} />;
  }
  return (
    <div style={{ backgroundColor: "white" }} className={styles.myreviews}>
      <h1>{`we found ${data.data.reviews.length} of your reviews`}</h1>
      {data.data.reviews.map((review) => (
        <MyReview
          key={review._id}
          review={review}
          handleDeleteReview={handleDeleteReview}
          handleViewAttraction={handleViewAttraction}
        />
      ))}
    </div>
  );
}

export default MyReviews;
