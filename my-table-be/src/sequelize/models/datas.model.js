const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Data = sequelize.define('Data', {
        data_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        data_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        data_value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        detailkpi_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'detailkpi',
                key: 'detailkpi_id',
            }
        },
        route_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'sales_routes',
                key: 'route_id',
            }
        }
    }, {
        tableName: 'datas',
        timestamps: false,
    });
    return Data;
};  