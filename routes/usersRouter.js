const express = require('express');
const router = express.Router();
const path = require ('path');
const multer = require ('multer');
//Requiriendo Controller//
const userController = require('../controllers/usersController');
//Requiriendo Middlewares//
const { check, validationResult, body } = require ('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const valLogin = require ('../middlewares/loginValMiddleware');
const valRegister = require ('../middlewares/registerValMiddleware');
//const upLoadFile = multer ({ multerMiddleware });

//LOGIN//
router.get('/login', userController.login);
router.post('/login', valLogin, userController.processLogin);

//REGISTRO//
router.get('/register', userController.register);
router.post('/register', /*upLoadFile.single('avatars'),*/valRegister, userController.saveRegister);


module.exports = router;