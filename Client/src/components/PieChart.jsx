import styles from "./Pie.module.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
ChartJs.register(Tooltip, Legend, ArcElement);
function PieChart({ data, chatToggle }) {
  const options = {};
  // const data = {
  //   lables: ["a", "b", "c"],
  //   datasets: [
  //     {
  //       label: "time",
  //       data: [100, 50, 80],
  //     },
  //   ],
  // };
  return (
    <div className={styles.pie}>
      <Pie options={options} data={data}></Pie>
      <button
        className={styles.chartBtn}
        onClick={() => {
          chatToggle((showChart) => !showChart);
        }}
      >
        Hide chart
      </button>
    </div>
  );
}

export default PieChart;
