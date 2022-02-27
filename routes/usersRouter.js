const express = require('express');
const router = express.Router();
const path = require ('path');
const multer = require ('multer');
//Requiriendo Controller//
const userController = require('../controllers/usersController');
//Requiriendo Middlewares//
const { check } = require ('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const valLogin = require ('../middlewares/loginValMiddleware');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './publics/images/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + " " + Date.now() + path.extname(file.originalname))
    }
})

const upLoadFile = multer ({ storage });

const valRegister = [
    check('first_name').notEmpty().withMessage("Debes completar el campo").bail().isLength({max: 15}).withMessage("Nombre demasiado largo"),
    check('last_name').notEmpty().withMessage("Debes completar el campo").bail().isLength({min: 3 ,max: 15}).withMessage("Escribe entre 3 y 15 carecteres"),
    check('email').notEmpty().withMessage("Debes completar el campo").bail().isEmail().withMessage("Email invalido"),
    check('password').notEmpty().withMessage("Debes completar el campo").bail().isLength({min: 7}).withMessage("Debes colocar al menos 7 carecteres")];
check('avatar').custom((value, { req }) => {
    let file = req.file;
    let validExt = ['.jpg','png.','.gif'];
    
    if (!file) {
        throw new Error ("Tenés que subir una imagen");
    } else {
    let fileExtension = path.extname (file.originalname)
        if (!valExt.includes(fileExtension)) {
            throw new Error (`Las extensiones aceptadas son ${validExt.join(', ')}`);
        }
    }
        return true;
})


//LOGIN//
router.get('/login', userController.login);
router.post('/login', valLogin, userController.processLogin);

//REGISTRO//
router.get('/register', userController.register);
router.post('/register', valRegister, upLoadFile.single('avatar'), userController.saveRegister);


module.exports = router;