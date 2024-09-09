import { useParams } from "react-router";
import styles from "./ReviewsPage.module.css";
import Reviews from "../components/Reviews";
function ReviewsPage() {
  const { attrationName, attractionId } = useParams();
  return <Reviews attractionId={attractionId} attractionName={attrationName} />;
}

export default ReviewsPage;
