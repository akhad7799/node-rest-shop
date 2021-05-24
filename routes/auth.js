const express = require('express');
const router = express.Router();
const UserAuthController = require('../controllers/UserAuthController');

router.post('/', UserAuthController.userAuth );



module.exports = router;