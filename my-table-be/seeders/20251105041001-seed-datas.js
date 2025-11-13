'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    // Các route_id có sẵn
    const routeIds = [
      1, 2, 3, 4, 5, 6,
      23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38
    ];

    // Các detailkpi_id từ 1 đến 20
    const detailIds = Array.from({ length: 20 }, (_, i) => i + 1);

    const startDate = new Date('2025-09-01');
    const daysInMonth = 30;

    // Sinh dữ liệu ngẫu nhiên
    for (const routeId of routeIds) {
      for (const detailkpi_id of detailIds) {
        for (let d = 0; d < daysInMonth; d++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + d);

          data.push({
            data_date: date.toISOString().split('T')[0], // YYYY-MM-DD
            data_value: Math.floor(Math.random() * 100) + 1, // 1–100
            detailkpi_id,
            route_id: routeId
          });
        }
      }
    }

    console.log(`✅ Seeding ${data.length} rows into 'datas'...`);
    await queryInterface.bulkInsert('datas', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('datas', null, {});
  }
};

