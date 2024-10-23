import React, { useState } from 'react';
import axios from 'axios';

function WeatherPredictor() {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');

    const predictWeather = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/predict', {
                temperature: parseFloat(temperature),
                humidity: parseFloat(humidity)
            });
            alert(`Predicted Temperature: ${response.data.predicted_temperature}`);
        } catch (error) {
            console.error('Error fetching prediction', error);
        }
    };

    return (
        <div>
            <h1>Weather Predictor</h1>
            <input type="number" placeholder="Temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
            <input type="number" placeholder="Humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
            <button onClick={predictWeather}>Predict Weather</button>
        </div>
    );
}

export default WeatherPredictor;
