exports.login = (req,res) => {
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.render('index',{
            title: 'There have been validation errors: ' + JSON.stringify(errors),
            isLoggedIn: false
        });
        return;
    }
    console.log(req.body);
    console.log('Email: ' + req.body.email);
    console.log('Passwaord: ' + req.body.password);

    if (req.body.remember === 'remember'){
        req.session.remember = true;
        req.session.email = req.body.email;
        req.session.cookie.maxAge = 60000;
    }

    res.render('index',{
        title: 'Logged in as ' + req.body.email,
        isLoggedIn: true
    });
};

exports.logout = (req,res) => {
    req.session = null;
    res.render('index',{
        title: 'See you again later',
        isLoggedIn: false
    });
};

const User = require('mongoose').model('User');

exports.create = (req,res,next) => {
    let user = new User(req.body);

    user.save((err) => {
        if(err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = (req,res,next) => {
    User.find({},(err,users) => {
        if(err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.userByUsername = (req,res,next,username) => {
    User.findOne({
        userName: username
    }, (err,user) => {
        if(err){
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.read = (req,res) => {
    res.json(req.user);
};

exports.update = (req,res,next) => {
    User.findOneAndUpdate({ userName: req.user.userName }, req.body,
        (err,user) => {
            if(err) {
                return next(err);
            } else {
                res.json({message: 'Update complete!'});
            }
        });
};
