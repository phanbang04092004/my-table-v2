const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fillter', 'root', '04092004', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối với database thành công.');
    } catch (error) {
        console.error('Kế nối thất bại.', error);
    }
};

module.exports = { sequelize, connectDB };