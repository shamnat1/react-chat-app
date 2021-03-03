module.exports = (sequelize, Sequelize) => {
    const Product_Image = sequelize.define("product_image", {
        id: {
            primaryKey: true,
            type: Sequelize.BIGINT(11)
        },
        product_id: {
            type: Sequelize.BIGINT(11)
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        width: {
            type: Sequelize.INTEGER
        },
        height: {
            type: Sequelize.INTEGER
        },
        src: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Product_Image;
};