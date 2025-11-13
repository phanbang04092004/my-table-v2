
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SalesRoute = sequelize.define('SalesRoute', {
        route_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        route_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        distributor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'distributors',
                key: 'distributor_id',
            },
        }

    }, {
        tableName: 'sales_routes',
        timestamps: false,
    }
    );


    return SalesRoute;
};