const express = require("express");
const router = express.Router();
const csvController = require("../controllers/upload/csv.controller");
const upload = require("../middlewares/upload");

let uploadFile = upload.single("file-to-upload");
let routes = (app) => {

    router.post('/upload',function(req,res){
        uploadFile(req,res,function(err) {
                if(err) {
                    return res.status(404).send({
                        status: 404,
                        message: 'Please upload a CSV or XML file!'
                    })

                }
                csvController.upload(req, res)
            }
        )}
    )
    router.get("/upload_history", csvController.uploadHistory);

    app.use("/api/csv", router);
};

function authChecker(req, res, next) {
    req.session.auth = process.env.NODE_ENV === 'TEST'?true:req.session.auth;
    if (req.session.auth || req.path==='/') {
        next();
    } else {
        res.redirect("/");
    }
}
module.exports = routes;