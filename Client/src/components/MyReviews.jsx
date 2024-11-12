import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteReviews } from "../hooks/useDeleteReviews";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import styles from "./MyReviews.module.css";
import NotFound from "./NotFound";
import MyReview from "./MyReview";
import toast from "react-hot-toast";
import { cityClicked } from "../slices/curCitySlice";
import { useFindMyReviews } from "../hooks/useFindMyReviews"; // Import the updated hook
import { useDispatch } from "react-redux";

function MyReviews() {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useFindMyReviews(currentPage); // Pass currentPage to hook
  const {
    mutate: deleteReview,
    isLoading: deleting,
    error: deletingError,
  } = useDeleteReviews("");

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function handleViewAttraction(cityId, attractionId, name = "myReview") {
    // toast.success("working on feature", {
    //   icon: "🔨",
    //   style: { color: "var(--color-red)" },
    // });
    dispatch(
      cityClicked({
        cityId: cityId,
        name: "",
        lat: "",
        lng: "",
      })
    );
    // navigator(`/travel/citydetail/${cityId}`);
    navigator(`/attraction/${name}/${attractionId}/reviews`);
  }

  function handleDeleteReview(id, attractionId) {
    // console.log("we are sending the delete mutate with ,", id);
    deleteReview(id, {
      onSuccess: () => {
        // console.log(
        //   "we deleted the review successfully and here in delete handel fun"
        // );
        queryClient.refetchQueries(["findMyReviews"]);
        queryClient.invalidateQueries(["findAllReviews", attractionId]);
      },
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  if (data.data.reviews.length === 0) {
    return <NotFound text="you have no reviews yet" height={100} width={100} />;
  }

  const totalReviews = data.pagination.totalReviews;
  const totalPages = data.pagination.totalPages;

  return (
    <div style={{ backgroundColor: "white" }} className={styles.myreviews}>
      <h1>{`We found ${totalReviews} of your reviews`}</h1>
      {data.data.reviews.map((review) => (
        <MyReview
          key={review._id}
          review={review}
          handleDeleteReview={handleDeleteReview}
          handleViewAttraction={handleViewAttraction}
        />
      ))}
      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MyReviews;
