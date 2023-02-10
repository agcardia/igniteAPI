const mongoose = require('mongoose');

const Schema = mongoose.Schema

const expenseSchema = new Schema({
    name: String,
    amount: Number,
    date: {type: Date, default: Date.now},
    description: String,
    payMethod: String,
})

module.exports = mongoose.model('Expense',expenseSchema);
