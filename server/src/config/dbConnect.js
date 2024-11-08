const { Sequelize } = require('sequelize');
const password = process.env.DB_PASSWORD || null
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, password, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: '+07:00',
    logging: false
});

const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = dbConnect