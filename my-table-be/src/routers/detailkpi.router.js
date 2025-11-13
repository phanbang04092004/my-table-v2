const express = require('express');
const detailkpiController = require('../controllers/detailkpi.controller');

const router = express.Router();

router.get('/', detailkpiController.getDetailKpis);


module.exports = router;