import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommunityReport from './CommunityReport';
import WeatherChart from './WeatherChart';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const updateChart = (data) => {
    const forecastTemps = data.daily.map(day => day.temp.day);
    const labels = data.daily.map(day => new Date(day.dt * 1000).toLocaleDateString());

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: forecastTemps,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await axios.get(`http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}`);
      setWeatherData(res.data);
      updateChart(res.data);
      notifySevereWeather(res.data.weather[0].main); // Example of severe weather check
    });
  };

  const notifySevereWeather = (condition) => {
    if (condition === "Thunderstorm") {
      new Notification("Severe Weather Alert", {
        body: "Severe weather has been reported in your area. Stay safe!",
      });
    }
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

  return (
    <div className="App">
      <h1>Weather Prediction App</h1>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <WeatherChart chartData={chartData} />
        </div>
      )}
      <CommunityReport />
    </div>
  );
}

export default App;
