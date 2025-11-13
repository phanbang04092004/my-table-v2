const express = require('express');
const router = express.Router();
const distributorController = require('../controllers/distributor.controller');

router.get('/', distributorController.getDistributors);

module.exports = router;