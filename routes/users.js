const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const UserController = require('../controllers/UserController');

router.post('/', UserController.addUser );
router.get('/', auth,  UserController.getUser );
router.get('/me', auth, UserController.getMe);
router.put('/me', auth, UserController.putMe);
module.exports = router;