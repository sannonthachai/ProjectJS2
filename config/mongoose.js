const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    let db = mongoose.connect(config.mongoUri,{ useNewUrlParser: true });
    console.log("Database is connect!");

    return db;
};