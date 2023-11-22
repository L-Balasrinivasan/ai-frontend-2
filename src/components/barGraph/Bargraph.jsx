import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js";
import "chart.js/auto";

const BarGraph = ({sentimentData}) => {
  console.log(sentimentData,"????")
  if (!sentimentData || !sentimentData.scores) {
    return null; 
  }

  const data = {
    labels: sentimentData.labels,
    datasets: [
      {
        data: sentimentData.scores,
        backgroundColor: ["#FF5A50", "#FFB412", "#00B8AD"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      },
      y: {
        min: 0,
        max: 1,  
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
