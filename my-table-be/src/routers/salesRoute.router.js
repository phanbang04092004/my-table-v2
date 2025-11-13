const express = require('express');
const router = express.Router();
const salesRouteController = require('../controllers/salesRoute.controller');

// GET /api/sales-routes?distributor_id=1
// GET /api/sales-routes?distributor_id=HCC_THANHTRI
router.get('/', salesRouteController.getSalesRoutes);

module.exports = router;
