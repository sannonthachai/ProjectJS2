const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/forwardauth');

// Index Page
router.get('/', forwardAuthenticated, (req,res) => {
    res.render('index')
});

// Profile Page
router.get('/profile', ensureAuthenticated,(req,res) => {
    res.render('profile' , {
        user: req.user
    })
});

module.exports = router;