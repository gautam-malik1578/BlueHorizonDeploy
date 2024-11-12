import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  FiBookOpen,
  FiSettings,
  FiTrendingUp,
  FiUser,
  FiTwitch,
} from "react-icons/fi";
import { HiMiniHeart } from "react-icons/hi2";
import { TbThumbUpFilled } from "react-icons/tb";
import styles from "./Dashboard.module.css";
import Popular from "../components/Popular";
import Liked from "../components/Liked";
import MyFavs from "../components/MyFavs";
import Settings from "../components/Settings";
import Admin from "../components/Admin";
import Author from "../components/Author";
import MyReviews from "../components/MyReviews";
function Dashboard() {
  const { show } = useParams();
  // console.log(show);
  return (
    <div className={styles.dashboard}>
      <aside>
        <p>quick access</p>
        <Link
          to="/dashboard/popular"
          style={show === "popular" ? { backgroundColor: "white" } : {}}
          className={`${styles.link} ${
            show === "popular" ? styles.active : ""
          }`}
        >
          <FiTrendingUp className={styles.icon} />{" "}
          <span className={styles.span}>popular</span>
        </Link>
        <Link
          to="/dashboard/liked"
          style={show === "liked" ? { backgroundColor: "white" } : {}}
          className={`${styles.link} ${show === "liked" ? styles.active : ""}`}
        >
          <TbThumbUpFilled className={styles.icon} />
          <span className={styles.span}>liked</span>
        </Link>
        <Link
          to="/dashboard/favorite"
          style={show === "favorite" ? { backgroundColor: "white" } : {}}
          className={`${styles.link} ${
            show === "favorite" ? styles.active : ""
          }`}
        >
          <HiMiniHeart className={styles.icon} />
          <span className={styles.span}>favorite</span>
        </Link>
        <Link
          to="/dashboard/reviews"
          style={show === "reviews" ? { backgroundColor: "white" } : {}}
          className={`${styles.link} ${
            show === "reviews" ? styles.active : ""
          }`}
        >
          <FiTwitch className={styles.icon} />
          <span className={styles.span}>POSTS</span>
        </Link>
        <Link
          to="/dashboard/settings"
          style={show === "settings" ? { backgroundColor: "white" } : {}}
          className={`${styles.link} ${
            show === "settings" ? styles.active : ""
          }`}
        >
          <FiSettings className={styles.icon} />
          <span className={styles.span}>settings</span>
        </Link>
        <Link
          to="/dashboard/admin"
          style={show === "admin" ? { backgroundColor: "white" } : {}}
          className={`${styles.link} ${show === "admin" ? styles.active : ""}`}
        >
          <FiUser className={styles.icon} />
          <span className={styles.span}>Admin controls</span>
        </Link>
        <Link
          to="/dashboard/author"
          style={show === "author" ? { backgroundColor: "white" } : {}}
          className={`${styles.link} ${show === "author" ? styles.active : ""}`}
        >
          <FiBookOpen className={styles.icon} />
          <span className={styles.span}>Author Notes</span>
        </Link>
        <span>&copy; blue Horizon @2024</span>
      </aside>
      <div className={styles.bucket}>
        {show === "popular" && <Popular />}
        {show === "liked" && <Liked />}
        {show === "favorite" && <MyFavs />}
        {show === "reviews" && <MyReviews />}
        {show === "settings" && <Settings />}
        {show === "admin" && <Admin />}
        {show === "author" && <Author />}
      </div>
    </div>
  );
}

export default Dashboard;
