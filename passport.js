const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy(async(username, password, cb) => {
    try {
      const user = await User.findOne({username});
      if (!user) {
        return cb(null, false, {message: "Incorrect username"});
      };
      bcrypt.compare(password, user.password, (err,res) => {
        if (res) {
          return cb(null, user, {message: "Logged in successfully"});
        } else {
          return cb(null, false, {message: "Incorrect password"});
        };
      })
    } catch(err) {
      return cb(err);
    }
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'your_jwt_secret'
  },
  async (jwtPayload, cb) => {
    try {
      const user = await User.findById(jwtPayload._id);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
}));

module.exports = passport;