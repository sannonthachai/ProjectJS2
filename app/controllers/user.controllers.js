// exports.login = (req,res) => {
//     req.checkBody('email','Invalid email').notEmpty().isEmail();
//     req.sanitizeBody('email').normalizeEmail();
//     var errors = req.validationErrors();
//     if (errors) {
//         res.render('index',{
//             title: 'There have been validation errors: ' + JSON.stringify(errors),
//             isLoggedIn: false
//         });
//         return;
//     }
//     console.log(req.body);
//     console.log('Email: ' + req.body.email);
//     console.log('Passwaord: ' + req.body.password);

//     if (req.body.remember === 'remember'){
//         req.session.remember = true;
//         req.session.email = req.body.email;
//         req.session.cookie.maxAge = 60000;
//     }

//     res.render('index',{
//         title: 'Logged in as ' + req.body.email,
//         isLoggedIn: true
//     });
// };

const passport = require('passport')
const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');

// body-parser

exports.create = (req,res,next) => {
    let user = new User(req.body);

    user.save((err) => {
        if(err) {
            return next(err);
        } else {
            res.json({message: 'Create complete!'});
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
        username: username
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
    User.findOneAndUpdate({ username: req.user.username }, req.body,
        (err,user) => {
            if(err) {
                return next(err);
            } else {
                res.json({message: 'Update complete!'});
            }
        });
};

exports.delete = (req,res,next) => {
    req.user.remove((err) => {
        if(err) {
            return next(err);
        } else {
            res.json({message: 'Delete complete!'});
        }
    });
};


// Passport Project
// Signup Page

exports.renderSignup = (req,res) => {
    res.render('signup');
};

// Signup Logic

exports.signup = (req,res,next) => {
    if (!req.user) {
        let user = new User(req.body);

        bcrypt.genSalt(10, (err,salt) =>
            bcrypt.hash(user.password, salt, (err,hash) => {
                if(err) throw err;

                user.password = hash

                user.save((err) => {
                    if(err) return res.redirect('/signup'), 
                    console.log('save error!');
                    req.login(user , (err) => {
                        if(err) return next(err);
                        return res.redirect('/');
                    });
                });
            }));     
    } else {
        return res.redirect('/');
    };
};

// Login Page

exports.renderLogin = (req,res) => {
    res.render('login');
};

// Login Logic

exports.login = (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
};

// Logout

exports.logout = (req,res) => {
    req.logout();
    // req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
};