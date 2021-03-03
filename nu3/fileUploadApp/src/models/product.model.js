module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id: {
            primaryKey: true,
            type: Sequelize.BIGINT(11)
        },
        title: {
            type: Sequelize.STRING
        },
        body_html: {
            type: Sequelize.STRING
        },
        vendor: {
            type: Sequelize.STRING
        },
        product_type: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        handle: {
            type: Sequelize.STRING
        },
        published_scope: {
            type: Sequelize.STRING
        },
        tags: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Product;
};