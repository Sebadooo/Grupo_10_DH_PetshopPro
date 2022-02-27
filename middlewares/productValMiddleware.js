const path = require ("path");
const { check } = require ("express-validator");

const validationCreateProd = [
    check('name').notEmpty().withMessage("Debes completar el campo"),
    check('description').notEmpty().withMessage("Debes completar el campo").isLength({min: 3, max: 15}).withMessage("Escribe entre 3 y 15 carecteres"),
    check('category').notEmpty().withMessage("Debes completar el campo").withMessage("Email invalido"),
    check('price').notEmpty().withMessage("Debes completar el campo").isNumeric().withMessage("Debes completar con un número")];

module.exports = validationCreateProd;