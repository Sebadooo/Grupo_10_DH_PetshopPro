    const { check } = require("express-validator");

    const validationLogin = [
        check('email').notEmpty().withMessage("Bebes completar el campo").bail().isEmail().withMessage("Email invalido"),
        check('password').notEmpty().withMessage("Bebes completar el campo").bail().isLength({ min: 7 }).withMessage("Debes colocar al menos 7 carecteres")
    ];


    module.exports = validationLogin;