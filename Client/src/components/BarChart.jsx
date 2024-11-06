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
        barThickness: 10, // Set a specific width for the bars (e.g., 10px)
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1,
          callback: (value) => value,
        },
      },
    },
    plugins: {
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const dataset = chart.getDatasetMeta(0).data;

        // Ensure images are drawn after preloading
        ctx.save();
        preloadedImages.forEach((img, index) => {
          const bar = dataset[index];
          if (bar && img.complete) {
            // Check if image is loaded
            const barX = bar.x;
            const barY = bar.y;
            const imgWidth = 30;
            const imgHeight = 30;

            ctx.drawImage(
              img,
              barX - imgWidth / 2,
              barY - imgHeight - 10, // Position image above the bar
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
      <Bar options={options} data={data} />
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
