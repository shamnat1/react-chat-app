const db = require("../../models");
const Inventory = db.inventory;
const Product = db.products;
const ProductImage = db.productImage;


const getProducts = (req, res) => {
    Product.findAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

const getInventories = (req, res) => {
    Inventory.findAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};
module.exports = {
    getInventories,
    getProducts
};