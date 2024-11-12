import { useState } from "react";
import { HiMiniHeart } from "react-icons/hi2";
import { TbThumbUp, TbThumbUpFilled } from "react-icons/tb";
import { HiOutlineHeart } from "react-icons/hi2";
import styles from "./AttractionDetails.module.css";
import Tags from "./Tags";
// import { useReviews } from "../hooks/useReviews";
import Reviews from "./Reviews";
import { useLikes } from "../hooks/useLikes";
import { useQueryClient } from "@tanstack/react-query";
import { useFavs } from "../hooks/useFavs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
function AttractionDetails({ attraction, setShowFeature, showfeature }) {
  const navigate = useNavigate();
  // console.log("this is the value of showfeature💔💔💔💔💔💔💔💔", showfeature);
  const [isExpand, setIsExpand] = useState(true);
  const queryClient = useQueryClient();
  const {
    mutate: toggleLike,
    error: likeError,
    isLoading: likeLoading,
  } = useLikes();
  const {
    mutate: toggleFav,
    error: favError,
    isLoading: favLoading,
  } = useFavs();
  function handleClickLike() {
    // console.log("the button was cliked to run like");
    toggleLike(attraction._id, {
      onSuccess: () => {
        // console.log("the on success handler ran of the likes:))))))))))");
        queryClient.refetchQueries(["attractionsOnACity", attraction.cityId]);
        queryClient.invalidateQueries(["findMyLikes"]);
      },
    });
  }
  function handleFavToggle(type) {
    // console.log("we are launching the toggle fav b with type", type);
    toggleFav(
      { type, attractionId: attraction._id },
      {
        onSuccess: () => {
          // console.log("we are in the success handler in fav");
          queryClient.refetchQueries(["attractionsOnACity", attraction.cityId]);
          queryClient.invalidateQueries(["findMyfavs"]);
          toast.success(
            `${
              type === "remove"
                ? "removed from favroites"
                : "added to favroites"
            }`,
            {
              icon: `${type === "remove" ? "💔" : "💖"}`,
              style: {
                color: `var(--color-${type === "remove" ? "red" : "green"})`,
              },
            }
          );
        },
      }
    );
  }
  return (
    <div className={styles.attractionDetails}>
      <div className={styles.attractionIntro}>
        <h2 className={styles.name}>
          {attraction?.attractionName || "name not found"}
        </h2>
        {/* ------------penchent----------------------- */}
        <div className={styles.penchent}>
          {/* ----------favs----------------------------- */}
          {attraction.isFav ? (
            <HiMiniHeart
              className={styles.icon}
              onClick={() => {
                handleFavToggle("remove");
              }}
            />
          ) : (
            <HiOutlineHeart
              className={styles.icon}
              onClick={() => {
                handleFavToggle("add");
              }}
            />
          )}
          {/* ---------------likes----------------- */}
          {attraction?.isLiked ? (
            <TbThumbUpFilled
              className={styles.icon}
              onClick={handleClickLike}
            />
          ) : (
            <TbThumbUp className={styles.icon} onClick={handleClickLike} />
          )}{" "}
          <p className={styles.numLikes}>{attraction.likes}</p>
        </div>
      </div>
      <div className={styles.tagsList}>
        {attraction.tags.map((tag) => (
          <Tags key={attraction._id}>{tag}</Tags>
        ))}
        <Tags>historic</Tags>
      </div>
      <div className={styles.description}>
        {isExpand
          ? attraction?.description.slice(0, 200) + "  ..."
          : attraction.description}
      </div>
      {!isExpand && (
        <button
          style={
            showfeature === "reviews"
              ? {
                  backgroundColor: "var(--color-red)",
                  transform: "translateY(-5px)",
                  boxShadow: "5px 5px 10px rgba(0,0,0,.2)",
                }
              : {}
          }
          className={styles.showBtn}
          onClick={() => {
            setShowFeature((info) => {
              if (info === "reviews") {
                return "";
              } else {
                return "reviews";
              }
            });
            navigate(
              `/attraction/${attraction.attractionName}/${attraction._id}/reviews`
            );
          }}
        >
          {/* reviews */}
          Posts
        </button>
      )}
      {!isExpand && (
        <button
          style={
            showfeature === "note"
              ? {
                  backgroundColor: "var(--color-red)",
                  transform: "translateY(-5px)",
                  boxShadow: "5px 5px 10px rgba(0,0,0,.2)",
                }
              : {}
          }
          className={`${styles.showBtn}`}
          onClick={() => {
            setShowFeature((info) => {
              if (info === "note") {
                return "";
              } else {
                return "note";
              }
            });
          }}
        >
          note
        </button>
      )}
      <button
        className={styles.showBtn}
        onClick={() => {
          setIsExpand((isExpand) => !isExpand);
          setShowFeature("");
        }}
      >
        {isExpand ? "show more" : "show less"}
      </button>
    </div>
  );
}

export default AttractionDetails;
