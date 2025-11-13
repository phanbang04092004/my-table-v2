'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const config = require(path.resolve(__dirname, '../src/sequelize/config.js'));
const sequelize = config.sequelize;

// Import models đúng đường dẫn
const DetailsKpi = require('../src/sequelize/models/detailskpi.model')(sequelize, DataTypes);


module.exports = {
  async up(queryInterface, Sequelize) {
    // Lấy danh sách tất cả detail KPI hiện có
    const details = await DetailsKpi.findAll();
    const data = [];

    const routeIds = [
      1, 2, 3, 4, 5, 6,
      23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38
    ];

    // Lặp 22 tuyến × N detail KPI × 30 ngày
    for (const routeId of routeIds) {
      for (const detail of details) {

      }
    }

    // Xóa và chèn mới
    await queryInterface.bulkDelete('dayskpi', null, {});
    await queryInterface.bulkInsert('dayskpi', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dayskpi', null, {});
  }
};
