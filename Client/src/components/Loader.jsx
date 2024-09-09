import Lottie from "react-lottie";
import styles from "./Loader.module.css";
import areoplane from "../animations/Airplane.json";
function Loader({ text = "loading", height = 150, width = 150 }) {
  // return <div className={styles.loader}>loading.....</div>;
  return (
    <div className={styles.loader}>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: areoplane,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={height}
        width={width}
        isClickToPauseDisabled={true}
      />
      <p>{text}</p>
    </div>
  );
}

export default Loader;
