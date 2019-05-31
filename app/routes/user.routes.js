const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user.model')
const { forwardAuthenticated } = require('../../config/forwardauth')

// Login Page
router.get('/login', forwardAuthenticated, (req,res) => {
    res.render('login')
})

// Signup Page
router.get('/signup', forwardAuthenticated, (req,res) => {
    res.render('signup')
})

// Register
router.post('/signup', (req,res) => {
    let { firstname, lastname, username, email, password, password2 } = req.body
    let errors = []

    if (!firstname || !lastname || !username || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' })
    }
    
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' })
    }
    
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('signup', {errors})
    } else {
        User.findOne({ username: username}, (err,user) => {
            if (err) throw err

            if (user) {
                errors.push({ msg: 'Username already exists' })
                res.render('signup', {errors})
            } else {
                let user = new User(req.body)

                bcrypt.genSalt(10, (err,salt) =>
                    bcrypt.hash(user.password, salt, (err,hash) => {
                        if(err) throw err

                        user.password = hash

                        user.save()
                        .then(user => {
                            req.flash('success_msg','You are now registered and can login')
                            res.redirect('/login')
                        })
                        .catch(err => console.log(err))
                })) 
            }
        })
    }
})

// Login
router.post('/login', passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })
)

// Logout
router.get('/logout', (req,res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/login')
})

module.exports = router