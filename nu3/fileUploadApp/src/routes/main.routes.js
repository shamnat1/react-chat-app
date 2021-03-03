const express = require("express");
const router = express.Router();
const listingController = require("../controllers/upload/listing.controller");
const path = require('path');

const axios = require('axios');
let routes = (app) => {
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('views',path.join(__dirname+'/../public/view'));

    router.get('/', (req, res) => {
        if (req.session.auth)
            res.redirect("/upload");
        res.render('index',{client_id: process.env.GIT_CLIENT_ID});
    });

    app.get('/oauth-callback', (req, res) => {

        const body = {
            client_id: process.env.GIT_CLIENT_ID,
            client_secret: process.env.GIT_SECRET_KEY,
            code: req.query.code
        };

        const opts = { headers: { accept: 'application/json' } };
        axios.post(`https://github.com/login/oauth/access_token`, body, opts).
        then(response => {
            let access_token = response.data.access_token
            req.session.auth = true
            req.session.access_token = access_token
            res.redirect('/upload');
        }).
        catch(err => res.status(500).json({ message: err.message }));


    })

    router.get('/upload', (req, res) => {
        res.status(200).sendFile('/src/public/view/upload.html' , { root : __basedir});
    });
    router.get('/products', (req, res) => {
        res.status(200).sendFile('/src/public/view/product.html' , { root : __basedir});
    });
    router.get('/inventories', (req, res) => {
        res.render('inventory');
    });

    router.get("/product/list", listingController.getProducts);
    router.get("/inventory/list", listingController.getInventories);

    app.use("/", router);
};

function authChecker(req, res, next) {
    if (req.session.auth || req.path==='/') {
        next();
    } else {
        res.redirect("/");
    }
}


module.exports = routes;