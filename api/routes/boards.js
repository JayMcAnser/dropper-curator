/**
 * access to the boards
 */
/**
 * access to the api
 */

const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boards');


router.post('/', boardController.create);
router.get('/:name', boardController.open)

module.exports = router;
