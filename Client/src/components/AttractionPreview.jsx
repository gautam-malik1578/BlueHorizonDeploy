import { TbThumbUpFilled } from "react-icons/tb";
import styles from "./AttractionPreview.module.css";
import Tags from "./Tags";
function AttractionPreview({ attraction }) {
  return (
    <div>
      <figure>
        <img src={attraction.img[0]} alt="attractionImg" />
      </figure>
      <div>
        <div className={styles.meta}>
          <h1>{attraction.attractionName}</h1>
          {attraction.likes ? (
            <div className={styles.likeBox}>
              <TbThumbUpFilled />
              <p>{attraction.likes}</p>
            </div>
          ) : null}
        </div>
        <h3>{attraction.cityName}</h3>
        <div className={styles.tags}>
          {attraction.tags.map((tag) => (
            <Tags key={tag}>{tag}</Tags>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AttractionPreview;
