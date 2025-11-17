const express = require('express');
const router = express.Router();
const dataController = require('../controllers/datas.controller');


router.get('/datas', dataController.getKpiByRouteAndMonth);
router.get('/accumulated', dataController.getAccumulatedByRouteAndMonth);


module.exports = router;
