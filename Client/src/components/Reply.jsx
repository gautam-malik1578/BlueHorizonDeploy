import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./Reply.module.css";
import ReplyForm from "./ReplyForm";
import { useDeleteReply } from "../hooks/useDeleteReply";
import UpdateReplyForm from "./UpdateReplyForm";
import Tags from "./Tags";
import { useSelector } from "react-redux";
function Reply({ reply, reviewId }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showUpdateReplyForm, setShowUpdateReplyForm] = useState(false);
  const currentUserId = useSelector((state) => state.user.userId);
  const {
    mutate: deleteReply,
    error: deleteError,
    isLoading: deleting,
  } = useDeleteReply(reviewId);
  return (
    <div className={styles.reply}>
      <div className={styles.replyIntro}>
        <div>
          <span className={styles.username}>{reply.username}</span>
          <BiRightArrowAlt className={styles.icon} />
          <span className={styles.replyTo}>{reply.replyTo}</span>
        </div>
        {reply.isUpdated ? <Tags type={"green"}>updated</Tags> : null}
      </div>
      <p>{reply.content}</p>
      <div className={styles.btns}>
        {currentUserId !== reply.userId && (
          <button
            style={showReplyForm ? { backgroundColor: "var(--color-red)" } : {}}
            onClick={() => {
              console.log("boi you clicked on to create a reply :()");
              setShowReplyForm((showReplyForm) => !showReplyForm);
              setShowUpdateReplyForm(false);
            }}
          >
            {showReplyForm ? "cancel" : "reply"}
          </button>
        )}
        {currentUserId === reply.userId && (
          <button
            onClick={() => {
              setShowUpdateReplyForm(
                (setShowUpdateReplyForm) => !setShowUpdateReplyForm
              );
              setShowReplyForm(false);
            }}
          >
            update
          </button>
        )}
        {currentUserId === reply.userId && (
          <button
            onClick={() => {
              deleteReply(reply._id);
            }}
          >
            delete
          </button>
        )}
      </div>
      {showUpdateReplyForm && (
        <UpdateReplyForm
          replyTo={reply.username}
          reviewId={reviewId}
          setShowUpdateReplyForm={setShowUpdateReplyForm}
          reply={reply}
        />
      )}
      {showReplyForm && (
        <ReplyForm
          replyTo={reply.username}
          reviewId={reviewId}
          setShowReplyForm={setShowReplyForm}
        />
      )}
    </div>
  );
}

export default Reply;
