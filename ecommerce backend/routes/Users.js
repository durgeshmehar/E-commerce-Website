const express = require('express');
const { fetchUserById,updateUserById } = require('../Controller/User');
const router = express.Router()

router.get('/:id',fetchUserById);
router.patch('/:id',updateUserById);

exports.router = router;