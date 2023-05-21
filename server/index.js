const express = require('express');
const connectDB = require('./models/connectDB');
const expense = require('./routes/expense');
const router = express.Router();
const revenue = require('./routes/revenue')
const invoice = require('./routes/invoice');
const clients = require('./routes/client');
const reciept = require('./routes/reciept');
const quotes = require('./routes/randomQuote');
const weather = require('./routes/weather');
const cors = require('cors');

app=express();
app.use(cors());
app.use(express.json());

app.use('/expense',expense);
app.use('/revenue',revenue);
app.use('/invoice',invoice);
app.use('/reciept',reciept);
app.use('/quote',quotes);
app.use('/client',clients);
app.use('/weather',weather);


connectDB();
app.listen(5000, () =>  { 
    console.log('running server!');
});
