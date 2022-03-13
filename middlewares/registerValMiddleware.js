const path = require ("path");
const { check } = require ("express-validator");


const validationRegister = [
    check('first_name').notEmpty().withMessage("Debes completar el campo").bail().isLength({max: 15}).withMessage("Nombre demasiado largo"),
    check('last_name').notEmpty().withMessage("Debes completar el campo").bail().isLength({min: 3 ,max: 15}).withMessage("Escribe entre 3 y 15 carecteres"),
    check('email').notEmpty().withMessage("Debes completar el campo").bail().isEmail().withMessage("Email invalido"),
    check('password').notEmpty().withMessage("Debes completar el campo").bail().isLength({min: 7}).withMessage("Debes colocar al menos 7 carecteres"),
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let validExt = ['.jpg','jpeg','png.','.gif'];
        
        if (!file) {
            throw new Error ("Tenés que subir una imagen");
        } else {
            let fileExtension = path.extname (file.originalname)
        if (!validExt.includes(fileExtension)) {
            throw new Error (`Las extensiones aceptadas son ${validExt.join(', ')}`);
        }
    }
        return true;
    })]
    
    module.exports = validationRegister;