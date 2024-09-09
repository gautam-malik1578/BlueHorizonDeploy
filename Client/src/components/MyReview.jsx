import { useState } from "react";
import styles from "./MyReview.module.css";
import Tags from "./Tags";
import UpdateDashboardReview from "./UpdateDashboardReview";
function MyReview({ review, handleDeleteReview, handleViewAttraction }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className={styles.review} key={review._id}>
      <figure>
        <img src={review.authorAvatarUrl} alt="userpic" />
      </figure>
      <div className={styles.info}>
        <div className={styles.meta}>
          <span>2hrs ago</span>
          {review.isUpdated && <Tags type="green">updated</Tags>}
        </div>
        <p className={styles.content}>{review.content}</p>
        <div className={styles.btns}>
          <button onClick={handleViewAttraction}>view attraction</button>
          <button
            style={showForm ? { backgroundColor: "var(--color-red)" } : {}}
            onClick={() => {
              setShowForm((showForm) => !showForm);
            }}
          >
            {showForm ? "cancel" : "update review"}
          </button>
          <button
            onClick={() => {
              handleDeleteReview(review._id, review.attraction);
            }}
          >
            delete review
          </button>
        </div>
        {showForm && (
          <UpdateDashboardReview
            content={review.content}
            attractionId={review.attraction}
            reviewId={review._id}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
}

export default MyReview;
