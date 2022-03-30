const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, '../publics/images/products')
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        let imageName = file.fieldname + " " + Date.now() + path.extname(file.originalname)
        cb(null, imageName);
    }
})

const upLoadFile = multer ({ storage });

module.exports = upLoadFile;
