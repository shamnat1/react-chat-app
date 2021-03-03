module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventory", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        handle: {
            type: Sequelize.STRING,
            unique: true
        },
        location: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.FLOAT
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        timestamps: false,
        hooks: {
        }
    });


    return Inventory;
};