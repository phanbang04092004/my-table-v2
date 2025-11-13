const salesRouteService = require('../services/salesRoute.service');

const getSalesRoutes = async (req, res) => {
    try {
        const { distributor_id } = req.query;
        const routes = await salesRouteService.getAllSalesRoutes(distributor_id);
        res.json(routes);
    } catch (error) {
        console.error("Error in salesRoute.controller.js (getSalesRoutes):", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSalesRoutes,
};
