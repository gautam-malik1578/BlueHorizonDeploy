import styles from "./Bar.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJs.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function BarChart({ data, chatToggle, images = [] }) {
  // Preload images before drawing
  const preloadedImages = images.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        barThickness: 10, // Width for the bars
        ticks: {
          font: {
            size: window.innerWidth < 320 ? 8 : 12, // Smaller font size if screen width < 320px
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1,
          callback: (value) => value,
          font: {
            size: window.innerWidth < 320 ? 8 : 12, // Smaller font size if screen width < 320px
          },
        },
      },
    },
    plugins: {
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const dataset = chart.getDatasetMeta(0).data;

        ctx.save();
        preloadedImages.forEach((img, index) => {
          const bar = dataset[index];
          if (bar && img.complete) {
            const barX = bar.x;
            const barY = bar.y;
            const imgWidth = 30;
            const imgHeight = 30;

            ctx.drawImage(
              img,
              barX - imgWidth / 2,
              barY - imgHeight - 10,
              imgWidth,
              imgHeight
            );
          }
        });
        ctx.restore();
      },
    },
  };

  return (
    // <div className={styles.chartPage}>
    <div className={styles.bar}>
      <Bar options={options} data={data} className={styles.chart} />
      <button
        className={styles.chartBtn}
        onClick={() => {
          chatToggle((showChart) => !showChart);
        }}
      >
        Hide chart
      </button>
    </div>
    // </div>
  );
}

export default BarChart;
