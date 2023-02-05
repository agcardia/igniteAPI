const express = require('express');
const connectDB = require('./models/connectDB');
const expense = require('./routes/expense');
const router = express.Router();
const revenue = require('./routes/revenue')

app=express();
app.use(express.json());

app.use('/expense',expense);
app.use('/revenue',revenue);

connectDB();
app.listen(3000, () =>  { 
    console.log('running server!');
});
