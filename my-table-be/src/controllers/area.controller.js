const areaService = require('../services/area.service');

const getAreas = async (req, res) => {
    try {
        const { region_id } = req.query;
        const areas = await areaService.getAllAreas(region_id);
        res.json(areas);
    } catch (error) {
        console.error("Error in area.controller.js (getAreas):", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAreas };
