const mongoose = require('mongoose');

const Schema = mongoose.Schema

const revenueSchema = new Schema({
    name: String,
    amount: Number,
    date: {type: Date, default: Date.now},
    invoiced: Boolean,
    paid: Boolean,
    payMethod: String,
});

module.exports = mongoose.model('Revenue',revenueSchema);
