const models = require('../sequelize/models');
const SalesRoute = models.SalesRoute;
const Distributor = models.Distributor;

const getAllSalesRoutes = async (distributorKey = null) => {
    try {
        const filter = {};

        if (distributorKey) {
            let distributorId = distributorKey;
            if (isNaN(Number(distributorKey))) {
                const distributor = await Distributor.findOne({
                    where: { distributor_code: distributorKey },
                    attributes: ['distributor_id'],
                });
                if (!distributor) {
                    throw new Error(`Distributor not found for code: ${distributorKey}`);
                }
                distributorId = distributor.distributor_id;
            }

            filter.distributor_id = distributorId;
        }

        const salesRoutes = await SalesRoute.findAll({
            where: filter,
            order: [['route_id', 'ASC']],
            attributes: ['route_id', 'route_name', 'distributor_id'],
        });

        return salesRoutes;
    } catch (error) {
        console.error("Error in salesRoute.service.js (getAllSalesRoutes):", error);
        throw new Error('Could not fetch sales routes.');
    }
};

module.exports = {
    getAllSalesRoutes,
};
