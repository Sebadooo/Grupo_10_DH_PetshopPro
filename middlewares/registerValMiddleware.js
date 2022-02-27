const path = require ("path");
const { check } = require ("express-validator");

const validationRegister = [
    check('first_name').notEmpty().withMessage("Debes completar el campo").isLength({max: 15}).withMessage("Nombre demasiado largo"),
    check('last_name').notEmpty().withMessage("Debes completar el campo").isLength({min: 3 ,max: 15}).withMessage("Escribe entre 3 y 15 carecteres"),
    check('email').notEmpty().withMessage("Debes completar el campo").isEmail().withMessage("Email invalido"),
    check('password').notEmpty().withMessage("Debes completar el campo").isLength({min: 7}).withMessage("Debes colocar al menos 7 carecteres")];

module.exports = validationRegister;