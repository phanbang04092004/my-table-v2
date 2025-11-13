const models = require('../sequelize/models');
const Area = models.Area;

const getAllAreas = async (region_id) => {
    try {
        const whereClause = region_id ? { region_id } : {};
        const areas = await Area.findAll({
            where: whereClause,
            order: [['area_name', 'ASC']],
            attributes: ['area_id', 'area_name', 'region_id'],
        });
        return areas;
    }
    catch (error) {
        console.error("Error in area.service.js (getAllAreas):", error);
        throw new Error('Could not retrieve area data.');
    }
}



module.exports = {
    getAllAreas,
};
