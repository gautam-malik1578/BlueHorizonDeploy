import { useState } from "react";
import styles from "./Slider.module.css";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

function Slider({ data }) {
  const [cur, setCur] = useState(1);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  function jump(pathToJump) {
    if (!isLoggedIn) navigate("/login");
    else {
      navigate(pathToJump);
    }
  }
  function handleRight() {
    if (cur == data.length) {
      setCur(1);
    } else {
      setCur((cur) => (cur = cur + 1));
    }
  }
  function handleLeft() {
    if (cur == 1) {
      setCur(data.length);
    } else {
      setCur((cur) => (cur = cur - 1));
    }
  }
  return (
    <div className={styles.slider}>
      {data.map((d) => {
        return (
          <div
            className={cur == d.id ? styles.slide_active : styles.slide}
            key={1}
          >
            {" "}
            <div className={styles.left} onClick={handleLeft}>
              &lsaquo;
            </div>
            <figure
              className={styles.fig}
              onClick={() => {
                jump(d.path);
              }}
            >
              <img src={d.img} className={styles.img} alt="" />
            </figure>
            <p className={styles.info}>{d.heading}</p>
            <div className={styles.right} onClick={handleRight}>
              &rsaquo;
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
