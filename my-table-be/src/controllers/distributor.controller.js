const distributorService = require('../services/distributor.service');

const getDistributors = async (req, res) => {
    try {
        const { area_id } = req.query;
        const distributors = await distributorService.getAllDistributors(area_id);
        res.json(distributors);
    } catch (error) {
        console.error("Error in distributor.controller.js (getDistributors):", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDistributors };
