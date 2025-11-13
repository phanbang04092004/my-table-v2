const {
    getDataByRouterDetailAndMonth
} = require('../services/datas.service');

async function getKpiByRouteAndMonth(req, res) {
    try {
        const { salesRoute, month } = req.params;
        const result = await getDataByRouterDetailAndMonth(salesRoute, month);
        return res.json(result);
    } catch (error) {
        console.error('Lỗi Controller - getKpiByRouteAndMonth:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi server khi lấy dữ liệu KPI'
        });
    }
}
module.exports = {
    getKpiByRouteAndMonth,
};

