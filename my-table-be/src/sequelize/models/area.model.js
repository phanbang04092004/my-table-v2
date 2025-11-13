const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Area = sequelize.define('Area', {
        area_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        area_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'regions',
                key: 'region_id',
            },
        }
    }, {
        tableName: 'areas',
        timestamps: false,
    }
    );

    return Area;
};