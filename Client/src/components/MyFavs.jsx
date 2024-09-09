import { useFindMyFavs } from "../hooks/useFindMyFavs";
import AttractionItem from "./AttractionItem";
import Loader from "./Loader";
import styles from "./MyFavs.module.css";
import NotFound from "./NotFound";
function MyFavs() {
  const { data, isLoading, error } = useFindMyFavs();
  if (isLoading) {
    return <Loader />;
  }
  console.log(data?.data.favAttractions[0].attractionIds);
  const len = data?.data.favAttractions[0].attractionIds.length;
  console.log(len);
  if (len === 0) {
    return <NotFound text="No Favs Yet :(" />;
  }
  return (
    <div style={{ backgroundColor: "white" }} className={styles.fav}>
      {len && (
        <h1
          className={styles.head}
        >{`we found ${len} of your favorite attractions`}</h1>
      )}
      {data?.data.favAttractions[0].attractionIds.map((attraction) => (
        <AttractionItem
          key={attraction._id}
          type="fav"
          attraction={attraction}
        />
      ))}
    </div>
  );
}

export default MyFavs;
