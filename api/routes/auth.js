/**
 * access to the api
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');


router.post('/register', authController.create);
router.post('/authenticate', authController.authenticate);


module.exports = router;
