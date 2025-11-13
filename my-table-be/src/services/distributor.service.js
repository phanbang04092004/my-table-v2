const models = require('../sequelize/models');


const Distributor = models.Distributor;

const getAllDistributors = async (areaId = null) => {
    try {
        const filter = {};
        if (areaId) {
            filter.area_id = areaId;
        }

        const distributors = await Distributor.findAll({
            where: filter,
            order: [['distributor_id', 'ASC']],
            attributes: ['distributor_id', 'distributor_name', 'area_id'],
        });

        return distributors;
    } catch (error) {
        console.error("Error in distributor.service.js (getAllDistributors):", error);
        throw new Error('Could not fetch distributors.');
    }
};




module.exports = {
    getAllDistributors,

};
