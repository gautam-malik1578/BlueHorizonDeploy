import { useForm } from "react-hook-form";
import styles from "./UpdateDashboardReview.module.css";
import { useUpdateReviews } from "../hooks/useUpdateReview";
import { useQueryClient } from "@tanstack/react-query";
function UpdateDashboardReview({
  attractionId,
  reviewId,
  content,
  setShowForm,
}) {
  const { mutate, error, isLoading } = useUpdateReviews(
    attractionId,
    setShowForm
  );
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  function handleOnSubmit(data) {
    // console.log("we reached on handle submit with value", data);
    const content = data.content;
    const id = reviewId;
    mutate(
      { id, content },
      {
        onSuccess: () => {
          setShowForm(false);
          queryClient.refetchQueries(["findMyReviews"]);
          reset();
        },
      }
    );
  }
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
      <label htmlFor="content">make ammendments to your review</label>
      <textarea
        name=""
        id="content"
        defaultValue={content}
        {...register("content")}
      ></textarea>
      <button>update</button>
    </form>
  );
}

export default UpdateDashboardReview;
