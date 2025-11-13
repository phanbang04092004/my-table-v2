const express = require('express');
const router = express.Router();
const dataController = require('../controllers/datas.controller');

router.get('/:salesRoute/:month', dataController.getKpiByRouteAndMonth);


module.exports = router;
