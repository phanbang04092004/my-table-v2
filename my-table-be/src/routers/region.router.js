const express = require('express');
const regionController = require('../controllers/region.controller');

const router = express.Router();

router.get('/', regionController.getRegions);


module.exports = router;