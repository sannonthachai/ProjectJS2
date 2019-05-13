const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('debug',config.debug);
    let db = mongoose.connect(config.mongoUri,{ useNewUrlParser: true });

    require('../app/models/user.model');


    console.log('Connect success!');

    return db;
};