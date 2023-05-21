const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req,res) => {
    try {
        axios.get('https://api.weather.gov/gridpoints/MTR/85,105/forecast')
        .then(response => {
            const rawData = response.data.properties.periods[0];
            const filteredData = {
                "name": rawData.name,
                "isDaytime": rawData.isDaytime,
                "temperature": rawData.temperature,
                "shortForecast":rawData.shortForecast,
            }
            res.send(filteredData);
            res.status(200)
        })
    }
    catch (error) {
        res.status(400)
    }
});

module.exports = router;