const path = require ("path");
const { check } = require ("express-validator");

const validationCreateProd = [
    check('name').notEmpty().withMessage("Debes completar el campo"),
    check('description').notEmpty().withMessage("Debes completar el campo").isLength({min: 10, max: 150}).withMessage("Escribe entre 10 y 150 carecteres"),
    check('category').notEmpty().withMessage("Debes completar el campo"),
    check('price').notEmpty().withMessage("Debes completar el campo").isNumeric().withMessage("Debes completar con un número"),
    check('prodImage').custom((values, { req }) => {
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

module.exports = validationCreateProd;