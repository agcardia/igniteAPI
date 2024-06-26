const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoiceModel');

router.post('/',async (req,res) => {
    try {
        name = req.body.name;
        amount = req.body.amount;
        date = Date.now();
        client = req.body.client;
        description = req.body.description;
        paid = req.body.paid;
        sent = req.body.sent;

        const invoice  = new Invoice({
            name,
            amount,
            date,
            client,
            description,
            paid,
            sent
        });

        console.log(invoice);

        const invoiceDoc = await(invoice).save();

        res.status(200).json({
            success: true,
            message: 'Invoice has been added successfully!',
            brand: invoiceDoc
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
        const expenses = await Invoice.find({});
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
        const invoices = await Invoice.findById(id);
        res.status(200).json({
            "Results": invoices
        });

    }
    catch (error) {
        res.status(400).json({
            error:'Error in query'
        })
    };
});

module.exports = router;