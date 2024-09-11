import { useState } from "react";
import { useReviews } from "../hooks/useReviews";
import Loader from "./Loader";
import NotFound from "./NotFound";
import Review from "./Review";
import styles from "./Reviews.module.css";
import ReviewForm from "./ReviewForm";
import UpdateReviewForm from "./UpdateReviewForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
function Reviews({ attractionId, attractionName }) {
  const navigator = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [wannbeUpdate, setWannabeUpdate] = useState({});
  const { data, isLoading } = useReviews(attractionId);
  const loggedInUserId = useSelector((state) => state.user.userId);
  return (
    <div className={styles.reviews}>
      {!showForm && !showUpdateForm ? (
        <div className={styles.reviewsIntro}>
          <button
            className={styles.backbtn}
            onClick={() => {
              navigator(-1);
            }}
          >
            <IoArrowBackOutline className={styles.icon} />
          </button>
          <p>{`we found ${data?.length} Posts on ${attractionName}`}</p>
          <button
            className={styles.addReview}
            onClick={() => {
              setShowForm((showForm) => !showForm);
              setShowUpdateForm(false);
            }}
          >
            add Post
          </button>
        </div>
      ) : null}
      {/* by here we had the to intro part */}
      {showUpdateForm ? (
        <UpdateReviewForm
          wannbeUpdate={wannbeUpdate}
          setShowForm={setShowForm}
          setShowUpdateForm={setShowUpdateForm}
        />
      ) : showForm ? (
        <ReviewForm
          attractionId={attractionId}
          setShowForm={setShowForm}
          attractionName={attractionName}
        />
      ) : isLoading ? (
        <Loader height={200} width={200} />
      ) : data?.length === 0 ? (
        <NotFound />
      ) : (
        data?.map((review) => (
          <Review
            key={review?._id}
            review={review}
            attractionId={attractionId}
            setShowForm={setShowForm}
            setShowUpdateForm={setShowUpdateForm}
            setWannabeUpdate={setWannabeUpdate}
            loggedInUserId={loggedInUserId}
          />
        ))
      )}
    </div>
  );
}

export default Reviews;
