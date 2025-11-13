const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Distributor = sequelize.define('Distributor', {
        distributor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        distributor_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        area_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'areas',
                key: 'area_id',
            },
        }
    }, {
        tableName: 'distributors',
        timestamps: false,
    }
    );


    return Distributor;
};