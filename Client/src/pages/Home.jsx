import Lottie from "react-lottie";
// import Slider from "../components/Slider";
import anni1 from "../animations/anni1.json";
import anni2 from "../animations/anni2.json";
import anni404 from "../animations/anni404.json";
// import Airplane from "../animations/Airplane.json";
import styles from "./Home.module.css";
import { useEffect } from "react";
import Loader from "../components/Loader";
function Home() {
  return (
    <div className={styles.home}>
      <Loader anni={anni404} />
    </div>
  );
}

export default Home;
