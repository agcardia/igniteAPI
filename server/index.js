const express = require('express');
const connectDB = require('./models/connectDB');
const expense = require('./routes/expense');
const router = express.Router();
const revenue = require('./routes/revenue')
const invoice = require('./routes/invoice');
const reciept = require('./routes/reciept');
const cors = require('cors');

app=express();
app.use(cors());
app.use(express.json());

app.use('/expense',expense);
app.use('/revenue',revenue);
app.use('/invoice',invoice);
app.use('/reciept',reciept);


connectDB();
app.listen(5000, () =>  { 
    console.log('running server!');
});
