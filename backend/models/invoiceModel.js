const mongoose = require('mongoose');

const Schema = mongoose.Schema

const invoiceSchema = new Schema({
    name: String,
    amount: Number,
    date: {type: Date, default: Date.now},
    description: String,
    project: String,
    client: String
})

module.exports = mongoose.model('Invoice',invoiceSchema);
