const {
    getDataByRouterDetailAndMonth,
    getAccumulatedByMonth
} = require('../services/datas.service');

async function getKpiByRouteAndMonth(req, res) {
    try {
        const { routeId, month } = req.query;
        
        
        if (!routeId || !month) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu tham số routeId hoặc month'
            });
        }
        
        const result = await getDataByRouterDetailAndMonth(routeId, month);
        return res.json(result);
    } catch (error) {
        console.error('Lỗi Controller - getKpiByRouteAndMonth:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi server khi lấy dữ liệu KPI'
        });
    }
}

async function getAccumulatedByRouteAndMonth(req, res) {
    try {
        const { routeId, month } = req.query;
        
        
        if (!routeId || !month) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu tham số routeId hoặc month'
            });
        }
        const result = await getAccumulatedByMonth(routeId, month);
        
        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Lỗi Controller - getAccumulatedByRouteAndMonth:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi server khi lấy dữ liệu accumulated'
        });
    }
}

module.exports = {
    getKpiByRouteAndMonth,
    getAccumulatedByRouteAndMonth,
};

