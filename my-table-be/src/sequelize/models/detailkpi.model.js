const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DetailKpi = sequelize.define('DetailKpi', {
        detailkpi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        kpi: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        detailItem: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        acumulated: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        tableName: 'detailkpi',
        timestamps: false,
    }
    );

    return DetailKpi;
};