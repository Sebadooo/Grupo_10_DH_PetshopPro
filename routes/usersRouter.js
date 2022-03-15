const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
//Requiriendo Controller//
const userController = require("../controllers/usersController");
//Requiriendo Middlewares//
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const valLogin = require("../middlewares/loginValMiddleware");
const valReg = require("../middlewares/registerValMiddleware");
const upLoadFile = require("../middlewares/userMulterMiddleware");

//LOGIN//
router.get("/userLogin", userController.login);
router.post("/userLogin", valLogin, userController.processLogin);

//REGISTRO//
router.get("/userRegister", userController.register);
router.post(
  "/userRegister",
  valReg,
  upLoadFile.single("avatar"),
  userController.saveRegister
);

//CARRITO DE COMPRAS//
router.get("/shopCart", userController.shopCart);
//router.post('/shopCart', userController.completeShop);

//RUTAS SEQUELIZE//
router.get("/userRegister", valReg, userController.createUser);
router.post("/crear", userController.saveUser);

module.exports = router;
