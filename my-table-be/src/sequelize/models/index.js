const Sequelize = require('sequelize');
const { sequelize } = require('../config');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js'
    ))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });


db.DetailKpi.hasMany(db.Data, {
    foreignKey: 'detailkpi_id',
    as: 'datas'
});

db.Data.belongsTo(db.DetailKpi, {
    foreignKey: 'detailkpi_id',
    as: 'detailkpi'
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
