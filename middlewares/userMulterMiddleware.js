const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join (__dirname, '../public/images/avatars');
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        let fileName = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const upLoadFile = multer ({ storage });

module.exports = upLoadFile;
