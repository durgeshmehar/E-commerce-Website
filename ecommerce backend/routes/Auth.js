const express = require('express');
const { createUser,loginUser, checkAuth ,resetPasswordRequest ,resetPassword ,logout } = require('../Controller/Auth');
const router = express.Router();
const passport = require('passport');

router.post('/signup',createUser);
router.post('/login',passport.authenticate('local'),loginUser);
router.get('/check',passport.authenticate('jwt'),checkAuth);
router.get('/logout',logout);
router.post('/reset-password-request',resetPasswordRequest);
router.post('/reset-password',resetPassword);

exports.router = router;