import { useForm } from "react-hook-form";
import styles from "./ReplyForm.module.css";
import { useSelector } from "react-redux";
import { useCreateReply } from "../hooks/useCreateReply";
import { useDeleteReply } from "../hooks/useDeleteReply";
import { useUpdateReply } from "../hooks/useUpdateReply";
function ReplyForm({ replyTo, reviewId, setShowReplyForm }) {
  const username = useSelector((state) => state.user.username);
  const {
    mutate: createReply,
    error: createError,
    isLoading: creating,
  } = useCreateReply(reviewId);

  let action = "";
  function handleOnSubmit(data) {
    const content = { ...data, username, replyTo };
    // console.log("this is what i have i reply form on submit", content);
    if (action === "create") {
      createReply(content, {
        onSuccess: () => {
          reset();
          setShowReplyForm(false);
        },
      });
    }
    if (action === "update") {
      updateReply({ content });
    }
  }
  function handleSubmitError(err) {
    // console.log("we are in the error of submiting the error on ", err);
  }

  const { register, reset, handleSubmit } = useForm();
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit, handleSubmitError)}
      className={styles.form}
    >
      <div>
        <label htmlFor="username">userName - </label>
        <input type="text" id="username" value={username} disabled={true} />
      </div>
      <div>
        <label htmlFor="replyTo">responding to -</label>
        <input type="text" id="replyTo" value={replyTo} disabled={true} />
      </div>
      <div className={styles.content}>
        <label htmlFor="content">write your reply below</label>
        <textarea
          id="content"
          required
          {...register("content", {
            validate: (value) => {
              if (value === "") {
                return "reply can not be empty";
              }
              return true;
            },
          })}
        ></textarea>
      </div>
      <div>
        <button
          onClick={() => {
            action = "create";
          }}
        >
          create
        </button>
      </div>
    </form>
  );
}

export default ReplyForm;
