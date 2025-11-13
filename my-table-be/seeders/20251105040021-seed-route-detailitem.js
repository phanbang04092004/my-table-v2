'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const routeIds = [
      1, 2, 3, 4, 5, 6,
      23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38
    ];

    const detailKpiIds = Array.from({ length: 20 }, (_, i) => i + 1);

    const data = [];

    routeIds.forEach(routeId => {
      detailKpiIds.forEach(detailId => {
        data.push({
          route_id: routeId,
          detailkpi_id: detailId
        });
      });
    });

    await queryInterface.bulkInsert('Route_DetailItem', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Route_DetailItem', null, {});
  }
};
