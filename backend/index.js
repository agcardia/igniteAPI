const express = require('express');
const connectDB = require('./models/connectDB');
const invoice = require('./routes/invoice');
const router = express.Router();
const Expense = require('./models/expenseModel');

app=express();
app.use(express.json());

app.use('/invoice',invoice);

connectDB();
app.listen(3000, () =>  { 
    console.log('running server!');
});
