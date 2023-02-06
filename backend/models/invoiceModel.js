const mongoose = require('mongoose');

const Schema = mongoose.Schema

const invoiceSchema = new Schema({
    name: String,
    totalAmount: Number,
    date: {type: Date, default: Date.now},
    project: String,
    client: String,
    description: [String],
    price: [Number],
    paid: Boolean,
    sent: Boolean
})

module.exports = mongoose.model('Invoice',invoiceSchema);
