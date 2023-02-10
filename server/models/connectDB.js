const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname,'../.env')});

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

    } catch(err) {
        console.log(err);
    }
};

module.exports = connectDB;