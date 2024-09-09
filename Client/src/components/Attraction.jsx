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
          src={`${
            attraction?.imgs[0]
              ? attraction?.imgs[0]
              : "https://images.pexels.com/photos/13832305/pexels-photo-13832305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }`}
          alt="xyz"
        />
        {/* {console.log("😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎", attraction?.imgs[0])} */}
      </figure>
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
  );
}

export default Attraction;
