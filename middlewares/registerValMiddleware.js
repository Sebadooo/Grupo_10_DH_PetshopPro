const path = require("path");
const { check } = require("express-validator");
const multer = require('multer');
const upLoadFile = require('../middlewares/userMulterMiddleware');


const validationRegister = [
    check('first_name').notEmpty().withMessage("Debes completar con tu nombre").bail().isLength({ min: 2 }).withMessage("Nombre demasiado corto").trim(),
    check('last_name').notEmpty().withMessage("Debes completar con tu apellido").bail().isLength({ min: 2 }).withMessage("Apellido demasiado corto").trim(),
    check('email').notEmpty().withMessage("Debes completar con tu Email").bail().isEmail().withMessage("Email invalido").trim(),
    check('password').notEmpty().withMessage("Debes completar una contraseña").bail().isLength({ min: 7 }).withMessage("La contraseña debe tener 7 carecteres o más").trim(),
    check('avatar').custom((values, { req }) => {
        let file = req.file;
        let validExt = ['.jpg','.JPG','.jpeg', '.png', '.gif'];

        if (!file) {
            throw new Error("Debes subir una imagen");
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!validExt.includes(fileExtension)) {
                throw new Error(`Las extensiones aceptadas son ${validExt.join(', ')}`);
            };
        };
        return true;
    })
]

module.exports = validationRegister;