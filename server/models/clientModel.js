const mongoose = require('mongoose');

const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: String,
    dateAdded: { type: Date, default: Date.now()},
});

module.exports = mongoose.model("Client",clientSchema);

