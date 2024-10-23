import React from 'react';
import { Line } from 'react-chartjs-2';

const WeatherChart = ({ chartData }) => {
  return (
    <div>
      <h2>Temperature Forecast</h2>
      <Line data={chartData} />
    </div>
  );
};

export default WeatherChart;
