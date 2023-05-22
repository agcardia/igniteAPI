const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');

router.post('/',async (req,res) => {
    try {
        console.log(req.body);
        name = req.body.name;
        dateAdded = new Date(req.body.dateAdded);

        const client  = new Client({
            name,
            dateAdded,
        });

        const clientDoc = await(client).save();

        res.status(200).json({
            success: true,
            message: `Client has been added successfully!`,
            brand: clientDoc
          });
    }
    catch (error) {
        res.status(400).json({
            error:'Error in payload.'
        });
    }
});

router.get('/', async (req,res) => {
    try {
        const client = await Client.find({});
        res.status(200).json({
            "Results": client
        });
    }
    catch (error) {
        res.status(400).json({
            error:'Error in query'
        })
    };
});

router.get('/:id', async (req,res) => {
    try {
        id = req.params.id;
        const client = await Client.findById(id);
        res.status(200).json({
            "Results": client
        });

    }
    catch (error) {
        res.status(400).json({
            error:'Error in query'
        })
    };
});

module.exports = router;