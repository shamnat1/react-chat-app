const db = require("../../models");
const Inventory = db.inventory;
const Product = db.products;
const ProductImage = db.productImage;

const fs = require("fs");
const csv = require("fast-csv");
const xml2js = require('xml2js');


const upload = async (req, res) => {
    try {
        if(req.file == undefined) {
            return res.status(404).send({
                status: 404,
                message: 'Please upload a CSV or XML file!'
            })

        }
        let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
        if(req.file.mimetype.includes('csv')) {
            uploadCsv(req, res,path)

        }
        if(req.file.mimetype.includes('xml')) {
            uploadXml(req, res,path);

        }
    } catch (error) {
        console.log("error: ",error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

const uploadCsv = (req, res,path)=>{
    try {
        let inventories = [];
        fs.createReadStream(path)
            .pipe(csv.parse({headers: true, delimiter: ';'}))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                inventories.push(row);
            })
            .on("end", () => {
                Inventory.bulkCreate(inventories,{
                    updateOnDuplicate: ["location","amount"]
                })
                    .then(() => {
                        res.status(200).send({
                            success : true,
                            message: "File Uploaded successfully",
                            filePath: path
                        });

                    })
                    .catch((error) => {
                        res.status(500).send({
                            success : false,
                            message: "Fail to import data into database!",
                            error: error.message,
                        });
                    });
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
}
const uploadXml = (req, res,path)=>{
    try {
            let products = []
            let parser = new xml2js.Parser({ignoreAttrs : true,tagNameProcessors: [convertKey]
            });
            fs.readFile(path, function(err, data) {
                parser.parseString(data,function (err, result) {
                    if(result&&result.products&&result.products.product){
                        let productImages = [];
                        result.products.product.map(product=>{
                            product.image.map(image => {
                                productImages.push(image)
                            })
                        })
                        Product.bulkCreate(result.products.product,{
                                updateOnDuplicate: ["title","body_html","vendor","product_type","handle","created_at","published_scope","tags"]
                            })
                            .then(() => {
                                ProductImage.bulkCreate(productImages,{
                                        updateOnDuplicate: ["product_id","created_at","updated_at","width","height","src"]
                                    })
                                    .then(() => {
                                        res.status(200).send({
                                            success : true,
                                            message: "File Uploaded successfully",
                                            filePath: path
                                        });
                                    })
                                    .catch((error) => {
                                        res.status(500).send({
                                            success : false,
                                            message: "Fail to import data into database image!",
                                            error: error.message,
                                        });
                                    });
                            })
                            .catch((error) => {
                                res.status(500).send({
                                    success : false,
                                    message: "Fail to import data into database!",
                                    error: error.message,
                                });
                            });
                    }

                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Could not upload the file: "
        });
    }
}

const convertKey = (name) =>{
    return name.replace('-','_');
}

const uploadHistory = (req,res) => {

    let directoryPath = __basedir + "/resources/static/assets/uploads/";
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        let response = [];
        files.forEach(function (file) {
            let fileD = {};
            fileD.fileName = file;
            let name = file.split('-upload-');
            fileD.date = new Date(parseInt(name[0])).toString();
            fileD.name = name[1];
            response.push(fileD)
        });
        res.status(200).send(response);
    });

}
module.exports = {
    upload,
    uploadCsv,
    uploadXml,
    convertKey,
    uploadHistory
};