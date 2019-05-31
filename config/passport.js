const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../app/models/user.model');


module.exports = (passport) => {
    passport.use(new LocalStrategy({ 
      usernameField: 'username',
      passwordField: 'password' 
    }, (username, password, done) => {
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

    passport.serializeUser((user,done) => {
        done(null,user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });
};



// if (isMatch) {
//   (req,res) => {
//   let payload = {
//       sub: req.body.username,
//       iat: new Date().getTime()
//   };
//   let SECRET = 'MY_SECRET_KEY';
//   jwt.encode(payload, SECRET);
//   return done(null, user);
// }
// }

