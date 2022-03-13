const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './publics/images/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + " " + Date.now() + path.extname(file.originalname))
    }
})

const upLoadFile = multer ({ storage });

module.exports = upLoadFile;
