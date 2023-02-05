const express = require('express');
const connectDB = require('./models/connectDB');
const expense = require('./routes/expense');
const router = express.Router();
const Expense = require('./models/expenseModel');

app=express();
app.use(express.json());

app.use('/expense',expense);

connectDB();
app.listen(3000, () =>  { 
    console.log('running server!');
});
