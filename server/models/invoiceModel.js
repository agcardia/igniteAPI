const mongoose = require('mongoose');

const Schema = mongoose.Schema

const invoiceSchema = new Schema({
    name: String,
    amount: Number,
    date: {type: Date, default: Date.now},
    client: String,
    description: String,
    paid: Boolean,
    sent: Boolean
})

module.exports = mongoose.model('Invoice',invoiceSchema);
