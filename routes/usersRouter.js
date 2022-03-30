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
const valReg = require ('../middlewares/registerValMiddleware');
const upLoadFile = require ('../middlewares/userMulterMiddleware');




//LOGIN//
router.get('/userLogin', userController.login);
router.post('/userLogin', valLogin, userController.processLogin);

//REGISTRO//
router.get('/userRegister', userController.register);
router.post('/userRegister', upLoadFile.single('avatar'), userController.saveRegister);

//CARRITO DE COMPRAS//
router.get('/shopCart', userController.shopCart);
//router.post('/shopCart', userController.completeShop);

//(C) CREAR NUEVO USUARIO//
router.get("/userCreate", userController.createUser);
router.post("/userCreate", userController.saveUser);

//(R) LISTADO DE USUARIOS//
router.get("/users", userController.showUsers);
// DETALLE DEL USUARIO//
router.get("/userDetail/:user_id", userController.userDetail);

//(U) EDICION DE USUARIOS//
router.get("/userEdit/:user_id", userController.editUser);
router.post("/userEdit/:user_id", userController.updateUser);

//(D) ELIMINAR USUARIO//
router.post("/userDelete/:user_id", userController.deleteUser)


module.exports = router;