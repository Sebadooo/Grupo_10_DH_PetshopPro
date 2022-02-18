const path = require ("path");
const { check } = require ("express-validator");

const validationLogin = [
    check('email').isEmail().withMessage("Email invalido"),
    check('password').isLength({min: 7}).withMessage("Debes colocar al menos 7 carecteres")];

    
module.exports = validationLogin;