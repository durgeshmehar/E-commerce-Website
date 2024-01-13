const express = require('express');
const { createUser,loginUser,checkUser } = require('../Controller/Auth');
const router = express.Router();
const passport = require('passport');

router.post('/signup',createUser);
router.post('/login',passport.authenticate('local'),loginUser);
router.get('/check',checkUser);

exports.router = router;