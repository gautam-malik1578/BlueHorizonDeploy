import { useFindMyLikes } from "../hooks/useFindMyLikes";
import AttractionItem from "./AttractionItem";
import styles from "./Liked.module.css";
import Loader from "./Loader";
import NotFound from "./NotFound";
function Liked() {
  const { data, error, isLoading } = useFindMyLikes();
  const len = data?.data?.likedAttractions[0]?.attractionsIds?.length; //len of the arr
  if (isLoading) {
    return <Loader />;
  }
  // if (len === 0) {
  //   return <NotFound text="No liked Attraction Yet :(" />; //rendering not found component
  // }
  return (
    <div style={{ backgroundColor: "white" }} className={styles.liked}>
      {len && (
        <h1
          className={styles.head}
        >{`we found ${len} attractions liked by you`}</h1>
      )}
      {data?.data?.likedAttractions[0]?.attractionsIds.map((attraction) => (
        <AttractionItem
          key={attraction._id}
          type="like"
          attraction={attraction}
        />
      ))}
      {len == 0 && <NotFound text="No liked Attraction Yet :(" />}
      {"liked"}
    </div>
  );
}

export default Liked;
