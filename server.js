const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/key');

// connect to mongoDB
mongoose.connect(db.mongoURI,db.set)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// morgan
app.use(morgan('dev'));

// EJS
app.use(expressLayouts);
app.set('views','./app/views');
app.set('view engine','ejs');

// Express body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Express session
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// routes
app.use('/', require('./app/routes/index.routes'));
app.use('/', require('./app/routes/user.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));