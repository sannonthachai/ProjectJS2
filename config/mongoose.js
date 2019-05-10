const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    let db = mongoose.connect(config.mongoUri);

    return db;
};