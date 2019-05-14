const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = () => {
    passport.use(new LocalStrategy ((username,password,done) => {
        User.findOne({ userName: username}, (err,user) => {
            if(err) {return done(err);}
            if(!user || !user.authenticate(password)){
                return done(null, false, {
                    message: 'Invalid username or password'
                });
            }
            return done(null,user);
        });
    }));
};