let LocalStrategy = require('passport-local').Strategy;
let models = require('./models');
let bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  passport.deserializeUser(function(id, done) {
    models.User.findOne({
      where: {
        'id': id
      }
    }).then(user => {
      if(user == null) {
        done(new Error('Wrong user ID.'))
      }
      done(null, user);
    })
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    return models.User.findOne({
      where: {
        'email': email
      },
    }).then(user => {
      if(user == null) {
        req.flash('message', 'Incorrect credentials.');
        return done(null, false);
      } else if(user.password == null || user.password == undefined) {
        req.flash('message', 'You must reset your password.');
        return done(null, false);
      } else if(!validPassword(user, password) {
        req.flash('message', 'Incorrect credentials.');
        return done(null, false);
      }
      return done(null, user);
    }).catch(err => {
      done(err, false);
    })
  }))
}
