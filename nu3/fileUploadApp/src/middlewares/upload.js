const multer = require("multer");

const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv") || file.mimetype.includes("xml")) {
        cb(null, true);
    } else {
        // return cb(new Error("Please upload csv/xml file"), false);
        cb("Please upload csv/xml file.", false);
        // cb(null, false);
        // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        // return cb(null, false, new Error('Please upload csv/xml file'));
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-upload-${file.originalname}`);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;