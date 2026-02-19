import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const WeatherChart = ({ hourlyData }) => {
  const data = {
    labels: hourlyData.map((h) => {
      const date = new Date(h.dt * 1000);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });
    }),
    datasets: [
      {
        label: "Temperature",
        data: hourlyData.map((h) => h.main.temp),
        borderColor: "#ff9f43",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 2,
        pointBackgroundColor: "#ff9f43",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 40,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.2)",
        },
        ticks: {
          callback: (value) => value + "°C",
          font: { size: 12 },
          padding: 25,
          color: "#000",
        },
      },
      x: {
        position: "top",
        grid: {
          color: "rgba(0, 0, 0, 0.2)",
        },
        ticks: {
          padding: 20,
          color: "#000",
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <>
      <section className="weather-chart">
        <h3 className="chart__title">Hourly forecast</h3>
        <Line data={data} options={options} />
      </section>
    </>
  );
};

export default WeatherChart;
