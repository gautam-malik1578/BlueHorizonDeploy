import { HiMiniHeart } from "react-icons/hi2";
import styles from "./AttractionItem.module.css";
import { TbThumbUpFilled } from "react-icons/tb";
import { useLikes } from "../hooks/useLikes";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useFavs } from "../hooks/useFavs";
function AttractionItem({ type = "like", attraction }) {
  const queryClient = useQueryClient();
  const {
    mutate: toggleLike,
    isLoading: isRemoveLike,
    error: LikeRemoveError,
  } = useLikes();
  const {
    mutate: removeFavs,
    isLoading: removingFav,
    error: favRemoveError,
  } = useFavs();
  function handleFavRemove(id) {
    removeFavs(
      { attractionId: id, type: "remove" },
      {
        onSuccess: () => {
          queryClient.refetchQueries(["findMyfavs"]);
          toast.success("removed from fav", {
            icon: "😎",
            style: { color: "var(--color-red)", textTransform: "capitalize" },
          });
        },
      }
    );
  }
  function handleLikeRemove(id) {
    toggleLike(id, {
      onSuccess: () => {
        queryClient.refetchQueries(["findMyLikes"]);
        toast.success("removed from like", {
          icon: "😎",
          style: { color: "var(--color-red)", textTransform: "capitalize" },
        });
      },
    });
  }
  return (
    <div
      className={styles.attraction}
      style={{
        backgroundColor: "white",
        boxShadow: "10px 10px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div className={styles.imgBox}>
        <figure>
          <img src={attraction.imgs[0]} alt="attractionPic" />
        </figure>
      </div>
      <div className={styles.contentBox} style={{ backgroundColor: "white" }}>
        <div className={styles.meta} style={{ backgroundColor: "white" }}>
          <h1>{attraction.attractionName}</h1>
          <div style={{ backgroundColor: "white" }}>
            <TbThumbUpFilled className={styles.icon} />
            <span>{attraction.likes}</span>
          </div>
        </div>
        <h3>{attraction.cityName}</h3>
        <p className={styles.description}>{attraction.description}</p>
        {type === "like" && (
          <button
            onClick={() => {
              handleLikeRemove(attraction._id);
            }}
          >
            remove
          </button>
        )}
        {type === "fav" && (
          <button
            onClick={() => {
              handleFavRemove(attraction._id);
            }}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
}

export default AttractionItem;
