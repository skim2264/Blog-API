var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");

const authController = require('../controllers/authController');

router.post('/login', authController.login_post);

router.post('/signup', authController.signup_post);

module.exports = router;
