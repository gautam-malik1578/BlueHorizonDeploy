import Loader from "./Loader";
import styles from "./SearchSuggetion.module.css";
function SearchSuggetion() {
  return (
    <div className={styles.suggestion}>
      <Loader
        text="Hi ! search of places you like or fancy 😁"
        height={300}
        width={300}
      />
    </div>
  );
}

export default SearchSuggetion;
