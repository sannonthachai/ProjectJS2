const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');

module.exports = () => {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
          // Match user
          User.findOne({
            username: username
          }).then(user => {
            if (!user) {
              return done(null, false, { message: 'That username is not registered' });
            }
    
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Password incorrect' });
              }
            });
          });
        })
      );

    // passport.use(new LocalStrategy ((username,password,done) => {
    //     User.findOne({ username: username}, (err,user) => {
    //         if(err) {return done(err);}
    //         if(!user || !user.authenticate(password)){
    //             return done(null, false, {
    //                 message: 'Invalid username or password'
    //             });
    //         }
    //         return done(null,user);
    //     });
    // }));
};