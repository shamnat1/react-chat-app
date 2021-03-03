require('dotenv').config();
module.exports = {
    HOST: process.env.HOST || "127.0.0.1",
    USER: process.env.USERNAME || "root",
    PASSWORD: process.env.PASSWORD || "root",
    DB: process.env.NODE_ENV === "test" ? process.env.TEST_DB : process.env.DB || "test",
    dialect: "mysql",
    port: process.env.DB_PORT || '8889',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};