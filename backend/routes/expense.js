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
            error:'Error in payload.'
        });
    }
});

router.get('/', async (req,res) => {
    try {
        console.log(req.params.id);
        const expenses = await Expense.find({});
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
        console.log(Expense.findById(id));
        const expenses = await Expense.findById(id);
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