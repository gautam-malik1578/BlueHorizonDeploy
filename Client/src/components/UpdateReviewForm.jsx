import { useForm } from "react-hook-form";
import styles from "./UpdateReviewForm.module.css";
import { useUpdateReviews } from "../hooks/useUpdateReview";
import { useSelector } from "react-redux";
function UpdateReviewForm({ wannbeUpdate, setShowForm, setShowUpdateForm }) {
  console.log("the wanna be obj is ---", wannbeUpdate);
  const username = useSelector((store) => store.user.username);
  const { id, attractionId } = wannbeUpdate;
  const { handleSubmit, register } = useForm();
  const { data, error, isLoading, mutate } = useUpdateReviews(
    attractionId,
    setShowUpdateForm
  );
  function onSumitUpdate(data) {
    const content = data.content;
    console.log("ASDasda", content);
    mutate(
      { id, content },
      {
        onSettled: () => {
          setShowUpdateForm(false);
        },
      }
    );
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSumitUpdate)}>
      <div>
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          defaultValue={username}
          disabled
          type="text"
          {...register("userName")}
        />
      </div>
      <div>
        <label htmlFor="content">make ammendmends in your comment</label>
        <textarea
          className={styles.content}
          defaultValue={wannbeUpdate.content}
          id="content"
          type="text"
          {...register("content")}
        />
      </div>
      <div className={styles.btns}>
        <button className={styles.creatbtn}>update Review</button>
        <button disabled className={styles.creatbtn}>
          Draft Review
        </button>
        <button
          className={styles.creatbtn}
          onClick={() => {
            setShowForm(false);
          }}
        >
          All Reviews &rarr;
        </button>
      </div>
    </form>
  );
}

export default UpdateReviewForm;
