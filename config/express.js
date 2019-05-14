const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sass = require('node-sass-middleware');
const validator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const config = require('./config');

module.exports = () => {
    let app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(compression);
    }

    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(cookieParser());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(validator());

    app.set('views','./app/views');
    app.set('view engine','pug');

    app.use(sass({
        src: './sass',
        dest: './public/css',
        outputStyle: 'compressed',
        prefix: '/css',
        debug: true
    }));

    app.use(express.static('./public'));

    require('../app/routes/index.routes')(app);
    require('../app/routes/user.routes')(app);
    return app;
};