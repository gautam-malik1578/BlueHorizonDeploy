import { useParams } from "react-router";
import styles from "./ReviewsPage.module.css";
import Reviews from "../components/Reviews";
function ReviewsPage() {
  const { attrationName, attractionId } = useParams();
  return (
    <div className={styles.parent}>
      <Reviews attractionId={attractionId} attractionName={attrationName} />;
    </div>
  );
}

export default ReviewsPage;
