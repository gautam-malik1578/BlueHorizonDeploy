import Slider from "../components/Slider";
import styles from "./Home.module.css";
const data = [
  {
    id: 1,
    img: "public/ss1.png",
    heading:
      "click on a city to know more about it and it's popular attractions",
    path: "/travel",
  },
  {
    id: 2,
    img: "public/ss2.png",
    heading:
      "search four your favrouite country ,city or major tourist attractions with our filters",
    path: "/travel",
  },
  {
    id: 3,
    img: "public/ss3.png",
    heading: "read what other people think  about a place and post your views ",
    path: "/travel",
  },
  {
    id: 4,
    img: "public/ss4.png",
    heading: "use dashboard for quick access to all our features",
    path: "/dashboard/popular",
  },
  {
    id: 5,
    img: "public/ss5.png",
    heading:
      "manage your profile,change your avatar reset your password and much more!!",
    path: "/me",
  },
];
function Home() {
  return (
    <div className={styles.home}>
      {/* <h1 className="home_head">our features!!</h1> */}
      <Slider data={data}></Slider>
    </div>
  );
}

export default Home;
