import { HiMiniHeart } from "react-icons/hi2";
import styles from "./AttractionItem.module.css";
import { TbThumbUpFilled } from "react-icons/tb";
import { useLikes } from "../hooks/useLikes";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useFavs } from "../hooks/useFavs";
import { useDispatch } from "react-redux";
import { cityClicked } from "../slices/curCitySlice";
import { useNavigate } from "react-router-dom";
function AttractionItem({ type = "like", attraction }) {
  const navigator = useNavigate();
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
  const dispatch = useDispatch();
  function handleViewAttraction(cityId) {
    dispatch(
      cityClicked({
        cityId: cityId,
        name: "",
        lat: "",
        lng: "",
      })
    );
    navigator(`/travel/citydetail/${cityId}`);
  }
  const words = attraction?.description?.split(" ");

  // Get the first 35 words and join them back with a space
  let shortDescription = words?.slice(0, 30)?.join(" ");
  shortDescription = shortDescription + "....";
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
          <img
            src={attraction.imgs[0]}
            alt="Img Not Found"
            onError={(e) => {
              e.target.src =
                "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=";
            }}
          />
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
        {/* <p className={styles.description}>{attraction.description}</p> */}
        <p className={styles.description}>{shortDescription}</p>
        <div className={styles.btns}>
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
          <button
            onClick={() => {
              handleViewAttraction(attraction.cityId);
            }}
          >
            view
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttractionItem;
