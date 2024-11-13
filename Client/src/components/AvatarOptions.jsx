import { useState } from "react";
import styles from "./AvatarOptions.module.css";
import { useUpdateAvatar } from "../hooks/useUpdateAvatar";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
function AvatarOptions({ setShowAvatarOptions, curAvatar }) {
  const [avatar, setAvatar] = useState("");
  const queryClient = useQueryClient();
  const {
    mutate: changeAvatar,
    isLoading: changingAvatar,
    error: avatarError,
  } = useUpdateAvatar();
  const avatars = [
    {
      avatarName: "default",
      avatarUrl:
        "https://st2.depositphotos.com/1069290/44761/v/450/depositphotos_447612982-stock-illustration-cute-young-man-avatar-character.jpg",
    },
    {
      avatarName: "shinchan",
      avatarUrl:
        "https://sdl-stickershop.line.naver.jp/products/0/0/4/1718/android/stickers/32883.png;compress=true",
    },
    {
      avatarName: "winry",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTE7yNy-bvMVfchlUiYXTDT0k6I9FzAFkMcNlw5gYGdg&s",
    },
    {
      avatarName: "saturu",
      avatarUrl:
        "https://dk2dv4ezy246u.cloudfront.net/widgets/sSFOv3Q1YSTl_large.jpg",
    },
    {
      avatarName: "po",
      avatarUrl:
        "https://w0.peakpx.com/wallpaper/887/334/HD-wallpaper-movie-kung-fu-panda-po-kung-fu-panda-thumbnail.jpg",
    },
    {
      avatarName: "kirmada",
      avatarUrl:
        "https://cdnb.artstation.com/p/assets/images/images/063/961/135/large/zain-latif-kirmada.jpg?1686767075",
    },
    {
      avatarName: "naruto",
      avatarUrl:
        "https://cdn.pixabay.com/photo/2023/09/04/03/24/ai-generated-8231889_640.png",
    },
    {
      avatarName: "goku",
      avatarUrl:
        "https://banner2.cleanpng.com/20240204/xro/transparent-goku-illustration-of-goku-from-dragon-ball-1710886648944.webp",
    },
    {
      avatarName: "pikachu",
      avatarUrl:
        "https://i.pinimg.com/736x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg",
    },
    {
      avatarName: "sakura",
      avatarUrl:
        "https://www.drawing123.com/wp-content/uploads/2022/11/Drawing-Sakura-Step-11.jpg",
    },
  ];
  if (changingAvatar) {
    return <Loader text="changing avatar" />;
  }
  return (
    <div className={styles.avatarBox}>
      <h2>select your avatar!</h2>
      <div className={styles.avatars}>
        {avatars.map((avatar) => (
          <div
            className={styles.avatar}
            key={avatar.avatarName}
            style={
              avatar.avatarName === curAvatar
                ? { backgroundColor: "whitesmoke", color: "var(--color-red)" }
                : {}
            }
            onClick={() => {
              if (avatar.avatarName === curAvatar) {
                setShowAvatarOptions(false);
                return;
              }
              changeAvatar(avatar.avatarName, {
                onSuccess: () => {
                  //   queryClient.invalidateQueries();
                  //   queryClient.refetchQueries(["findMe"]);
                  setShowAvatarOptions(false);
                },
              });
            }}
          >
            <figure>
              {/* <img src={`./${avatar.avatarName}.png`} alt={avatar.avatarName} /> */}
              <img
                src={avatar.avatarUrl}
                alt={avatar.avatarName}
                onError={(e) => {
                  e.target.src =
                    "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=";
                }}
              />
            </figure>
            <span>{avatar.avatarName}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setShowAvatarOptions(false);
        }}
      >
        back
      </button>
    </div>
  );
}

export default AvatarOptions;
