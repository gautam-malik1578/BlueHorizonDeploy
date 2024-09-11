import { useState } from "react";
import { useFindPopular } from "../hooks/useFindPopular";
import Loader from "./Loader";
import styles from "./Popular.module.css";
import Tags from "./Tags";
import Logo from "./Logo";
import { HiMiniHeart } from "react-icons/hi2";
import { TbThumbUpFilled } from "react-icons/tb";
import PieChart from "./PieChart";

function Popular() {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [showChart, setShowChart] = useState(false);
  console.log("the selected attraction is =-", selectedAttraction);
  const { isLoading, data: popData, error } = useFindPopular();
  function handleClickButton(id) {
    setSelectedAttraction(id);
  }
  if (isLoading) {
    return <Loader />;
  }
  console.log(popData);
  // const data = {
  //   lables: ["a", "b", "c"],
  //   datasets: [
  //     {
  //       label: "time",
  //       data: [100, 50, 80],
  //     },
  //   ],
  // };
  const labels = popData.map((item) => item.attractionName);
  const data = popData.map((item) => item.likes);
  const chartData = {
    labels,
    datasets: [
      {
        label: "LIKES",
        data,
        backgroundColor: [
          "rgba(225,99,132,0.9)",
          "rgba(54,162,235,.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(2, 206, 86, 0.9)",
          "rgba(153, 2, 86, 0.9)",
        ],
      },
    ],
  };
  return showChart ? (
    <PieChart data={chartData} chatToggle={setShowChart} />
  ) : (
    <div style={{ backgroundColor: "white" }} className={styles.popular}>
      <p>Here are Top trending attractions which got people buzzing!!! </p>
      <button
        className={styles.chartBtn}
        onClick={() => {
          setShowChart((showChart) => !showChart);
        }}
      >
        show chart
      </button>
      <div className={styles.attractionsName}>
        {popData.map((attraction, i) => (
          <button
            style={
              selectedAttraction === attraction._id
                ? {
                    backgroundColor: "var(--color-red)",
                    transform: "translateY(-5px)",
                  }
                : {}
            }
            className={styles.btnOptions}
            key={attraction._id}
            onClick={(e) => {
              e.preventDefault();
              handleClickButton(attraction._id);
            }}
          >
            {`#${i + 1} ${attraction.attractionName}`}
          </button>
        ))}
      </div>
      {popData
        .filter((attraction) => attraction._id === selectedAttraction)
        .map((attraction) => (
          <div key={attraction._id} className={styles.attraction}>
            {/* ----------------------------image ------------------------- */}
            <figure>
              <img src={attraction.imgs[0]} alt="attractionImg" />
            </figure>
            {/* ------------------------------details-------------------------- */}
            <div className={styles.attractionDetails}>
              <div className={styles.attractionIntro}>
                <h1>{attraction.attractionName}</h1>
                <h3>{attraction.cityName}</h3>
                <div>
                  {attraction.isFav && <HiMiniHeart className={styles.icon} />}
                  {attraction.isLiked && (
                    <TbThumbUpFilled className={styles.icon} />
                  )}
                  <span>{attraction.likes}</span>
                </div>
                {attraction.tags.map((tag) => (
                  <Tags key={attraction._id}>{tag}</Tags>
                ))}
              </div>
              <p className={styles.description}>{attraction.description}</p>
            </div>
          </div>
        ))}
      {selectedAttraction === null && <p>plz select an attraction</p>}
    </div>
  );
}

export default Popular;
