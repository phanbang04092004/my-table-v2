const models = require('../sequelize/models');

const DetailKpi = models.DetailKpi;
const getAllDetailKpis = async () => {
    try {
        const detailKpis = await DetailKpi.findAll();
        return detailKpis;
    } catch (error) {
        console.error("Error in detailkpi.service.js (getAllDetailKpis):", error);
        throw new Error('Could not retrieve detailkpi data.');
    }
}
module.exports = {
    getAllDetailKpis,
};

