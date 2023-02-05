const express = require('express');
const router = express.Router();
const Expense = require('../models/expenseModel');

router.post('/',async (req,res) => {
    try {
        console.log(req.body);
        name = req.body.name;
        date = Date.now();
        amount = parseInt(req.body.amount);
        invoiced = req.body.invoiced;
        paid = req.body.paid;
        payMethod = req.body.payMethod;

        const expense  = new Expense({
            name,
            amount,
            date,
            invoiced,
            paid,
            payMethod
        });

        const expenseDoc = await(expense).save();

        res.status(200).json({
            success: true,
            message: `Expense has been added successfully!`,
            brand: expenseDoc
          });
    }
    catch (error) {
        res.status(400).json({
            error:'Your request could not be processed, try again.'
        })
    }
});

module.exports = router;