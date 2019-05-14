const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('debug',config.debug);
    let setMongoose = { useCreateIndex: true , useNewUrlParser: true , useFindAndModify: false };
    let db = mongoose.connect(config.mongoUri,setMongoose);

    require('../app/models/user.model');


    console.log('Connect success!');

    return db;
};