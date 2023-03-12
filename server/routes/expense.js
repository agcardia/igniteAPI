const express = require('express');
const router = express.Router();
const Expense = require('../models/expenseModel');

router.post('/',async (req,res) => {
    try {
        name = req.body.name;
        date = new Date(req.body.date);
        console.log(date);
        amount = parseInt(req.body.amount);
        description = req.body.description;
        payMethod = req.body.payMethod;

        const expense  = new Expense({
            name,
            amount,
            date,
            description,
            payMethod
        });

        console.log(expense);

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
        console.log("reuested recieved!");
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