const User = require("../models/user");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require("passport");

//login
exports.login_post = asyncHandler(async(req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) {
        return res.status(400).json({
            message: 'Something is not right',
            user : user
        });
    }

    if (!user) {
      return res.send(info);
    }

    req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }

    const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
        return res.json({user, token});
      });
  })(req, res, next);
});

//signup
exports.signup_post = [
  body("username")
    .trim()
    .isLength({min:6})
    .escape()
    .withMessage("Username must be at least 6 characters.")
    .custom(async (value, {req}) => {
      const userInDB = await User.find({"username": req.body.username})
      if (userInDB.length > 0) {
        throw new Error("Username already exists.");
      }
    }),
  body("password")
    .trim()
    .escape()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0
      })
    .withMessage("Password must be at least 6 characters, and have at least 1 number."),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    }
    bcrypt.hash(req.body.password, 10, async(err, hashedPassword)=> {
      if(err) {return next(err)};
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      });
      await user.save();
      res.json(user);
    })
  })
];

//get all users info
exports.users_get = asyncHandler(async(req, res, next) => {

})

//setup admin user for the editing website