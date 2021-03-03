const dbConfig = require("../config/db.config.js");
const evenntConfig = require("../event/db.webhook.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? null : console.log,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.products = require("./product.model.js")(sequelize, Sequelize);
db.productImage = require("./product_image.model.js")(sequelize, Sequelize);
db.inventory = require("./inventory.model.js")(sequelize, Sequelize);

module.exports = db;