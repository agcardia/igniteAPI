const express = require('express');
const connectDB = require('./models/connectDB');
const expense = require('./routes/expense');
const router = express.Router();
const revenue = require('./routes/revenue')
const invoice = require('./routes/invoice');

app=express();
app.use(express.json());

app.use('/expense',expense);
app.use('/revenue',revenue);
app.use('/invoice',invoice);

connectDB();
app.listen(3000, () =>  { 
    console.log('running server!');
});
