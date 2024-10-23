const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY; // Your OpenWeather API key
  try {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    res.json(weatherData.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/report', async (req, res) => {
  const reportData = req.body;
  // Logic to save the report in the database (not implemented in this example)
  console.log('Received report:', reportData);
  res.status(200).send('Report submitted successfully');
});

module.exports = router;
