const express = require('express');
const router = express.Router();
const Revenue = require('../models/revenueModel');

router.post('/',async (req,res) => {
    try {
        name = req.body.name;
        date = new Date(req.body.date);
        amount = parseInt(req.body.amount);
        invoiced = req.body.invoiced;
        paid = req.body.paid;
        payMethod = req.body.payMethod;

        const revenue  = new Revenue({
            name,
            amount,
            date,
            invoiced,
            paid,
            payMethod
        });


        const revenueDoc = await(revenue).save();
        console.log(revenueDoc);

        res.status(200).json({
            success: true,
            message: `Revenue has been added successfully!`,
            brand: revenueDoc
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
        const expenses = await Revenue.find({});
        res.status(200).json({
            "Results": expenses
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
        const expenses = await Revenue.findById(id);
        res.status(200).json({
            "Results": expenses
        });

    }
    catch (error) {
        res.status(400).json({
            error:'Error in query'
        })
    };
});

module.exports = router;