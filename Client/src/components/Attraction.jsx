import { useState } from "react";
import styles from "./Attraction.module.css";
import AttractionDetails from "./AttractionDetails";
import Reviews from "./Reviews";
import Notes from "./Notes";
function Attraction({ attraction }) {
  const [showfeature, setShowFeature] = useState("");
  return (
    <div className={styles.attraction}>
      <figure className={styles.figure}>
        <img
          className={styles.img}
          src={
            attraction?.imgs[0]
              ? attraction?.imgs[0]
              : "https://images.pexels.com/photos/13832305/pexels-photo-13832305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt="Image not available"
          onError={(e) => {
            e.target.src =
              "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=";
          }}
        />

        {/* {console.log("😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎", attraction?.imgs[0])} */}
      </figure>
      <div>
        <AttractionDetails
          attraction={attraction}
          setShowFeature={setShowFeature}
          showfeature={showfeature}
        />
        {showfeature === "reviews" && (
          <Reviews
            attractionId={attraction._id}
            attractionName={attraction.attractionName}
          />
        )}
        {showfeature === "note" && <Notes attractionId={attraction._id} />}
      </div>
    </div>
  );
}

export default Attraction;
