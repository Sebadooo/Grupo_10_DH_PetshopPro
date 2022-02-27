const path = require ("path");
const { check } = require ("express-validator");

const validationLogin = [
    check('email').isEmpty().withMessage("Bebes completar el campo").isEmail().withMessage("Email invalido"),
    check('password').isEmpty().withMessage("Bebes completar el campo").isLength({min: 7}).withMessage("Debes colocar al menos 7 carecteres")];

    
module.exports = validationLogin;