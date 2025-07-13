const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/weather/:city', async (req, res, next) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    res.json(response.data);
  } catch (err) {
    next(err); // Pass error to middleware
  }
});

module.exports = router;
