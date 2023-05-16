const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req,res) => {
    try {
        axios.get('https://zenquotes.io/api/quotes')
        .then(response => {
            res.send(response.data[0]);
            res.status(200)
        })
    }
    catch (error) {
        res.status(400)
    }
});

module.exports = router;
