const express = require('express');
const router = express.Router();
// Requiriendo Controller //
const userController = require('../controllers/usersController');
// Requiriendo Middlewares //
const authMid = require('../middlewares/authMiddleware');
const guestMid = require('../middlewares/guestMiddleware');
const valLogin = require('../middlewares/loginValMiddleware');
const valReg = require('../middlewares/registerValMiddleware');
const upLoadFile = require('../middlewares/userMulterMiddleware');


//********REGISTRO********//
router.get('/userRegister', guestMid, userController.register);
router.post('/userRegister', upLoadFile.single('avatar'), valReg, userController.saveRegister);

//********LOG IN********//
router.get('/userLogin', guestMid, userController.login);
router.post('/userLogin', valLogin, userController.processLogin);

//********PERFIL USUARIO LOGUEADO********//
router.get('/userProfile', authMid, userController.profileUser);

//********LOG OUT********//
router.get('/userLogout', userController.logout);

//********CARRITO DE COMPRAS********//
router.get('/shopCart', userController.shopCart);
//router.post('/shopCart', userController.completeShop);

//********(C) CREAR NUEVO USUARIO********//
router.get("/userCreate", userController.createUser);
router.post("/userCreate", upLoadFile.single('avatar'), valReg, userController.saveUser);

//********(R) LISTADO DE USUARIOS********//
router.get("/users", userController.showUsers);

//******** DETALLE DEL USUARIO********//
router.get("/userDetail/:user_id", userController.userDetail);

//********(U) EDICION DE USUARIOS********//
router.get("/userEdit/:user_id", userController.editUser);
router.post("/userEdit/:user_id", valReg, userController.updateUser);

//********(D) ELIMINAR USUARIO********//
router.post("/userDelete/:user_id", userController.deleteUser)


module.exports = router;