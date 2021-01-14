/*
 * interfaces with the / world
 */

const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public');

router.get('/', )
router.get('/list', publicController.list);
router.get('/open/:name', publicController.open);


module.exports = router;
