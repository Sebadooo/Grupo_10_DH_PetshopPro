var storage = multer.discStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/imgages/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + " " + date.now() + path.extname(file.originalname))
    }
});

module.exports = storage;
