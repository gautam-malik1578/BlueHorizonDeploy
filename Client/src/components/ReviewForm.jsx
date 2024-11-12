import { Form, useForm } from "react-hook-form";
import styles from "./ReviewForm.module.css";
import { useMakeReview } from "../hooks/useMakeReviews";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
function ReviewForm({ attractionId, setShowForm, attractionName }) {
  const { register, handleSubmit } = useForm();
  const { mutate } = useMakeReview(attractionId, setShowForm);
  const loggedInUserName = useSelector((state) => state.user.username);
  // console.log(
  //   ")))))))))))))))))))))))))))))))))))))))))))))))))",
  //   attractionName
  // );
  function onSubmitForm(data) {
    // console.log(
    //   "this is form th ei=onSubmitform and the data is ())::::)))",
    //   data
    // );
    const content = data.content;
    mutate(content, {
      onSuccess: () => {
        toast.success("review created sucessfully", {
          icon: "😁",
          style: { color: "var(--color-green)" },
        });
      },
    });
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          type="text"
          {...register("userName")}
          value={loggedInUserName}
          disabled={true}
        />
      </div>
      <div>
        <label htmlFor="attraction">attraction</label>
        <input
          id="attraction"
          type="text"
          {...register("attraction")}
          disabled={true}
          //   defaultValue={attractionName}
          value={attractionName}
        />
      </div>
      <div>
        <label htmlFor="content">tell us what do think</label>
        <textarea
          className={styles.content}
          placeholder=" your post will be  visible to all the users"
          id="content"
          type="text"
          required={true}
          {...register("content")}
        />
      </div>
      <div className={styles.btns}>
        <button className={styles.creatbtn}>Create Post</button>
        {/* <button disabled className={styles.creatbtn}>
          Draft Post
        </button> */}
        <button
          className={styles.creatbtn}
          onClick={() => {
            setShowForm(false);
          }}
        >
          All posts &rarr;
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
