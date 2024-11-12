import { Await } from "react-router";
import { useDeleteReviews } from "../hooks/useDeleteReviews";
import Loader from "./Loader";
import styles from "./Review.module.css";
import { useState } from "react";
import Replies from "./Replies";
import ReplyForm from "./ReplyForm";
import { useSelector } from "react-redux";
import Tags from "./Tags";
function Review({
  review,
  attractionId,
  setShowForm,
  setShowUpdateForm,
  setWannabeUpdate,
  loggedInUserId,
}) {
  const { mutate, isLoading, error } = useDeleteReviews(attractionId);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const currentUserId = useSelector((state) => state.user.userId);
  // console.log("the error of deleting can be =====>", error);
  function handleDelete() {
    mutate(review._id);
  }
  return (
    <div className={styles.review}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.reviewInfo}>
            <figure className={styles.fig}>
              {/* <img
                src={`../../public/${
                  review.authorAvatar ? review.authorAvatar : "default"
                }.png`}
                alt="userpic"
              /> */}
              <img src={review.authorAvatarUrl} alt="userpic" />
            </figure>
            <span className={styles.reviewAutor}>{review.author}</span>
            <span className={styles.reviewDate} style={{ marginRight: "auto" }}>
              {review.createdAt.split("T")[0]}{" "}
            </span>
            {review.isUpdated && <Tags type="green">updated</Tags>}
          </div>
          <div className={styles.reviewContent}>{review.content}</div>
          <div className={styles.btns}>
            {loggedInUserId === review.user ? (
              <>
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setShowUpdateForm(true);
                    setWannabeUpdate(() => {
                      return {
                        id: review._id,
                        content: review.content,
                        attractionId,
                      };
                    });
                  }}
                >
                  update
                </button>
              </>
            ) : null}
            <button
              style={showReplies ? { backgroundColor: "var(--color-red)" } : {}}
              onClick={() => {
                setShowReplies((showReplies) => !showReplies);
              }}
            >
              {showReplies ? "hide replies" : "view replies"}
            </button>
            {currentUserId !== review.user && (
              <button
                style={
                  showReplyForm ? { backgroundColor: "var(--color-red)" } : {}
                }
                onClick={() => {
                  setShowReplyForm((showReplyForm) => !showReplyForm);
                  setShowReplies(false);
                }}
              >
                {showReplyForm ? "cancel" : "reply"}
              </button>
            )}
          </div>
        </>
      )}
      {showReplyForm && (
        <ReplyForm
          reviewId={review._id}
          replyTo={review.author}
          setShowReplyForm={setShowReplyForm}
        />
      )}
      {showReplies && <Replies reviewId={review._id} />}
    </div>
  );
}

export default Review;
