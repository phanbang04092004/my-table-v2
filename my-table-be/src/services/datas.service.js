const { Op } = require('sequelize');
const models = require('../sequelize/models');
const Data = models.Data;
const DetailKpi = models.DetailKpi;

async function getDataByRouterDetailAndMonth(idRouter, month) {
    try {

        let year, monthNum;
        if (month.includes('-')) {
            const parts = month.split('-');
            if (parts[0].length === 4) {
                year = parseInt(parts[0]);
                monthNum = parseInt(parts[1]);
            } else {
                monthNum = parseInt(parts[0]);
                year = parseInt(parts[1]);
            }
        } else {
            throw new Error('Format tháng không hợp lệ. Sử dụng: YYYY-MM hoặc MM-YYYY');
        }

        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 0);

        if (!idRouter) return [];

        const rawData = await Data.findAll({
            where: {
                route_id: idRouter,
                data_date: {
                    [Op.between]: [
                        startDate.toISOString().split('T')[0],
                        endDate.toISOString().split('T')[0]
                    ]
                }
            },
            include: [
                {
                    model: DetailKpi,
                    as: 'detailkpi',
                    attributes: ['detailkpi_id', 'content', 'kpi', 'detailItem']
                }
            ],
            order: [['detailkpi_id', 'ASC'], ['data_date', 'ASC']]
        });


        const grouped = {};

        rawData.forEach(row => {
            const id = row.detailkpi_id;
            if (!grouped[id]) {
                grouped[id] = {
                    detailkpi_id: id,
                    content: row.content,
                    kpi: row.kpi,
                    detailItem: row.detailItem,
                    detailInfo: row.detailKpi,
                    data: []
                };
            }
            grouped[id].data.push({
                date: row.data_date,
                value: row.data_value
            });
        });

        return Object.values(grouped);
    } catch (error) {
        console.error("Error in datas.service.js (getDataByRouterDetailAndMonth):", error);
        throw new Error('Could not retrieve grouped data for the specified router and month.');
    }
}

module.exports = {
    getDataByRouterDetailAndMonth,
};
