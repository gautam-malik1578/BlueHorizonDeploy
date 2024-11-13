import { useState } from "react";
import styles from "./MyReview.module.css";
import Tags from "./Tags";
import UpdateDashboardReview from "./UpdateDashboardReview";
function MyReview({ review, handleDeleteReview, handleViewAttraction }) {
  const [showForm, setShowForm] = useState(false);
  const ImgUrl = review?.attractionImg || review?.authorAvatarUrl;
  const attractionName = review?.attractionName || "myReview";
  return (
    <div className={styles.review} key={review._id}>
      <figure>
        {/* <img src={review.authorAvatarUrl} alt="userpic" /> */}
        <img
          src={ImgUrl}
          alt="Img Not Found"
          onError={(e) => {
            e.target.src =
              "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=";
          }}
        />
      </figure>
      <div className={styles.info}>
        <div className={styles.meta}>
          {/* <span>2hrs ago</span> */}
          {attractionName.length > 0 && attractionName != "myReview" && (
            <span>{attractionName}</span>
          )}
          <span>{review?.createdAt?.split("T")[0]}</span>
          {review.isUpdated && <Tags type="green">updated</Tags>}
        </div>
        <p className={styles.content}>{review.content}</p>
        <div className={styles.btns}>
          <button
            onClick={() =>
              handleViewAttraction(
                review.city,
                review.attraction,
                attractionName
              )
            }
          >
            view
          </button>
          <button
            style={showForm ? { backgroundColor: "var(--color-red)" } : {}}
            onClick={() => {
              setShowForm((showForm) => !showForm);
            }}
          >
            {showForm ? "cancel" : "update"}
          </button>
          <button
            onClick={() => {
              handleDeleteReview(review._id, review.attraction);
            }}
          >
            delete
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
