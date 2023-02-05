const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./models/connectDB');
const Expense = require('./models/revenueModel');

app=express();
app.use(express.json());

connectDB();

app.listen(3000, () =>  { 
    console.log('running server!');
});

app.post('/invoice', async (req,res) => {
    try {
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
