const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = () => {
    // passport.use('local-signup', new LocalStrategy({
    //     usernameField: 'username',
    //     passwordField: 'password',
    //     passReqToCallback: true
    // },
    //     function (req, username, password, done) {
    //         User.findOne({ 'local.username': username }, function (err, user) {
    //             if (err)
    //                 return done(err);
    //             if (user) {
    //                 return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    //             } else {
    //                 var newUser = new User();
    //                 newUser.local.username = username;
    //                 newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model

    //                 newUser.save(function (err) {
    //                     if (err)
    //                         throw err;
    //                     return done(null, newUser);
    //                 });
    //             }

    //         });

    //     }));

    passport.use(new LocalStrategy ((username,password,done) => {
        User.findOne({ username: username}, (err,user) => {
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