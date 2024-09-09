import { useCreateReply } from "../hooks/useCreateReply";
import { useFindReplies } from "../hooks/useFindReplies";
import Loader from "./Loader";
import NotFound from "./NotFound";
import styles from "./Replies.module.css";
import Reply from "./Reply";
function Replies({ reviewId }) {
  const { data, error, isLoading } = useFindReplies(reviewId);
  const {
    mutate: createReply,
    error: createReplyError,
    isLoading: createReplyLoading,
  } = useCreateReply();
  if (isLoading) {
    <Loader />;
  }
  if (data?.data?.replies.length === 0) {
    return <NotFound text="no replies yet" />;
  }
  return (
    <div className={styles.replies}>
      {data?.data?.replies.map((reply) => (
        <Reply
          key={reply.id}
          reply={reply}
          reviewId={reviewId}
          createReply={createReply}
        />
      ))}
    </div>
  );
}

export default Replies;
