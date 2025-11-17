const { Op } = require('sequelize');
const models = require('../sequelize/models');
const Data = models.Data;
const DetailKpi = models.DetailKpi;

function formatDateToISO(date) {
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }
    return date.toISOString().split('T')[0];
}

async function getDataByRouterDetailAndMonth(idRouter, month) {
    try {
        console.log('getDataByRouterDetailAndMonth called with:', { idRouter, month });

        const { year, monthNum } = parseMonth(month);

        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 0);

        // Kiểm tra Date có hợp lệ không
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error(`Ngày không hợp lệ: year=${year}, month=${monthNum}`);
        }

        if (!idRouter) {
            console.log('idRouter is empty, returning []');
            return [];
        }

        const rawData = await Data.findAll({
            where: {
                route_id: idRouter,
                data_date: {
                    [Op.between]: [
                        formatDateToISO(startDate),
                        formatDateToISO(endDate)
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
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            input: { idRouter, month }
        });
        throw error;
    }
}

async function getAccumulatedByMonth(idRouter, month) {
    try {
        const { year, monthNum } = parseMonth(month);

        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 0);

        // Kiểm tra Date có hợp lệ không
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error(`Ngày không hợp lệ: year=${year}, month=${monthNum}`);
        }

        if (!idRouter) return [];

        const [detailKpis, rawData] = await Promise.all([
            DetailKpi.findAll({
                attributes: ['detailkpi_id', 'content', 'kpi', 'detailItem', 'acumulated']
            }),
            Data.findAll({
                where: {
                    route_id: idRouter,
                    data_date: {
                        [Op.between]: [
                            formatDateToISO(startDate),
                            formatDateToISO(endDate)
                        ]
                    }
                },
                order: [['detailkpi_id', 'ASC'], ['data_date', 'ASC']]
            })
        ]);

        const accumulatedByDetailKpiId = {};
        rawData.forEach(row => {
            if (!accumulatedByDetailKpiId[row.detailkpi_id]) {
                accumulatedByDetailKpiId[row.detailkpi_id] = 0;
            }
            accumulatedByDetailKpiId[row.detailkpi_id] += row.data_value;
        });

        const getAccumulatedForDetailKpi = (detailkpiId) => {
            return accumulatedByDetailKpiId[detailkpiId] || 0;
        };

        const parseDetailKpiId = (str) => {

            const match = str.trim().match(/^td(\d+)$/i);
            if (match) {
                return parseInt(match[1]);
            }
            const num = parseInt(str.trim());
            return isNaN(num) ? null : num;
        };
        const result = detailKpis.map(detailKpi => {
            let accumulatedValue = null;

            if (detailKpi.acumulated === 'summonth') {

                const sumValue = getAccumulatedForDetailKpi(detailKpi.detailkpi_id);

                accumulatedValue = sumValue.toString();
            } else if (detailKpi.acumulated.includes('/')) {
                const parts = detailKpi.acumulated.split('/').map(p => p.trim());
                const numeratorStr = parts[0]; // td2
                const denominatorStr = parts[1]; // td1

                // Parse để lấy detailkpi_id
                const numeratorId = parseDetailKpiId(numeratorStr);
                const denominatorId = parseDetailKpiId(denominatorStr);

                if (numeratorId === null || denominatorId === null) {
                    console.warn(`Không thể parse detailkpi_id từ: ${detailKpi.acumulated}`);
                    accumulatedValue = "0%";
                } else {

                    const numeratorAccumulated = getAccumulatedForDetailKpi(numeratorId);
                    const denominatorAccumulated = getAccumulatedForDetailKpi(denominatorId);

                    if (denominatorAccumulated !== 0) {
                        const ratio = parseFloat((numeratorAccumulated / denominatorAccumulated * 100).toFixed(2));
                        accumulatedValue = ratio.toString() + "%";
                    } else {
                        accumulatedValue = "0%";
                    }
                }
            } else {
                accumulatedValue = "0";
            }

            return {
                detailkpi_id: detailKpi.detailkpi_id,
                content: detailKpi.content,
                kpi: detailKpi.kpi,
                detailItem: detailKpi.detailItem,
                acumulated: detailKpi.acumulated,
                accumulatedValue: accumulatedValue,
                month: month
            };
        });

        return result;
    } catch (error) {
        console.error("Error in datas.service.js (getAccumulatedByMonth):", error);
        throw new Error('Could not retrieve accumulated data for the specified router and month.');
    }
}

function parseMonth(month) {
    let year, monthNum;

    if (!month) {
        throw new Error('Tham số month không được để trống');
    }
    const monthStr = String(month).trim();

    if (monthStr.includes('-')) {
        const parts = monthStr.split('-');
        if (parts.length !== 2) {
            throw new Error('Format tháng không hợp lệ. Sử dụng: YYYY-MM hoặc MM-YYYY');
        }
        if (parts[0].length === 4) {
            year = parseInt(parts[0]);
            monthNum = parseInt(parts[1]);
        } else if (parts[0].length <= 2 && parts[1].length === 4) {
            monthNum = parseInt(parts[0]);
            year = parseInt(parts[1]);
        } else {
            throw new Error(`Format tháng không hợp lệ: ${monthStr}. Sử dụng: YYYY-MM hoặc MM-YYYY`);
        }
    } else {
        throw new Error(`Format tháng không hợp lệ: ${monthStr}. Phải có dấu gạch ngang (-)`);
    }
    if (isNaN(year) || isNaN(monthNum)) {
        throw new Error(`Giá trị year hoặc month không hợp lệ: year=${year}, month=${monthNum} (từ input: ${monthStr})`);
    }
    if (year < 1900 || year > 2100) {
        throw new Error(`Năm không hợp lệ: ${year}. Phải từ 1900 đến 2100`);
    }

    if (monthNum < 1 || monthNum > 12) {
        throw new Error(`Tháng không hợp lệ: ${monthNum}. Phải từ 1 đến 12`);
    }
    console.log('parseMonth result:', { year, monthNum });
    return { year, monthNum };
}

module.exports = {
    getDataByRouterDetailAndMonth,
    getAccumulatedByMonth,
};

