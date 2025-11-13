const detailkpiService = require('../services/detailkpi.service');

const getDetailKpis = async (req, res) => {
    try {
        const detailKpis = await detailkpiService.getAllDetailKpis();
        res.json(detailKpis);
    } catch (error) {
        console.error("Error in detailkpi.controller.js (getDetailKpis):", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDetailKpis };