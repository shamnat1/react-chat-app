const db = require("../models");
const Restaurant = db.restaurant;

// Create and Save a new Restaurant
exports.create = (req, res) => {
    // Validate request
    if (!req.body && !req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a restaurant
    const restaurant = new Restaurant({
        name: req.body.name,
        log: req.body.log,
        lat: req.body.lat,
        address: req.body.address
    });
    // Save restaurant in the database

    restaurant
        .save(restaurant)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Restaurant."
            });
        });
};

// Retrieve all restaurant from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Restaurant.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving restaurant."
            });
        });
};