
const regionService = require('../services/region.service');

const getRegions = async (req, res) => {
    try {
        const regions = await regionService.getAllRegions();
        res.status(200).json({ success: true, data: regions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    getRegions,
};