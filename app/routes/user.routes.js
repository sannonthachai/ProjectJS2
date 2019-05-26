const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user.model');

// Login Page
router.get('/login', (req,res) => {
    res.render('login');
});

// Signup Page
router.get('/signup', (req,res) => {
    res.render('signup');
});

// Register
router.post('/signup', (req,res) => {
    if (!req.user) {
        let user = new User(req.body);

        bcrypt.genSalt(10, (err,salt) =>
            bcrypt.hash(user.password, salt, (err,hash) => {
                if(err) throw err;

                user.password = hash

                user.save()
                .then(user => {
                    req.flash('success_msg','You are now registered and can login');
                    res.redirect('/login');
                })
                .catch(err => console.log(err));
            }));     
    } else {
        return res.redirect('/');
    };
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

module.exports = router;