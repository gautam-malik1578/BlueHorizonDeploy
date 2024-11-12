import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateReply } from "../hooks/useUpdateReply";
import { cloneElement } from "react";
import styles from "./UpdateReplyForm.module.css";

function UpdateReplyForm({ replyTo, reviewId, setShowUpdateReplyForm, reply }) {
  const username = useSelector((state) => state.user.username);
  const { register, handleSubmit, reset } = useForm();
  const {
    mutate: updateReply,
    error: updatingError,
    isLoading: updating,
  } = useUpdateReply(reviewId);
  function handleOnSubmit(data) {
    const content = { ...data };
    // console.log(
    //   "this is what i have i reply form on submit for update",
    //   content
    // );
    updateReply(
      { replyId: reply._id, content },
      {
        onSuccess: () => {
          reset();
          setShowUpdateReplyForm(false);
        },
      }
    );
  }
  function handleSubmitError(err) {
    // console.log("we are in the error of submiting the error on ", err);
  }

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit, handleSubmitError)}
      className={styles.form}
    >
      <div>
        <label htmlFor="username">userName</label>
        <input
          type="text"
          id="username"
          value={reply.username}
          disabled={true}
        />
      </div>
      <div>
        <label htmlFor="replyTo">reposding to</label>
        <input type="text" id="replyTo" value={reply.replyTo} disabled={true} />
      </div>
      <div className={styles.content}>
        <label htmlFor="content">update your reply below</label>
        <textarea
          id="content"
          {...register("content")}
          defaultValue={reply.content}
        ></textarea>
      </div>
      <div>
        <button onClick={() => {}}>update</button>
      </div>
    </form>
  );
}

export default UpdateReplyForm;
