const express = require('express');
const router = express.Router();
const prodCreVal = require ('../middlewares/productValMiddleware') 
const productController = require('../controllers/productsController');

//PÚBLICO//
/* GET ALL PRODUCTS (GET)*/
router.get('/products/all', productController.showAll);

/* PRODUCT DETAIL (GET)*/
//router.get('/detail/:id/', productController.showDetail);

/* BUSQUEDA DE PRODUCTO (GET)*/
//router.get('/products', productController.search);

//ADMINISTRADOR//
/* GET ALL PRODUCTS (GET)*/
//router.get('/products', productController.index);

/* CREATE A PRODUCT (GET/POST)*/
router.get('/productCreate', productController.create);
router.post('/productCreate', prodCreVal, productController.saveNewProduct);

/* GET EDIT PRODUCT (GET/PUT)*/
//router.get('/edit/:id', productController.edit);
//router.put('/edit/:id/', productController.update);

/* GET DELETE PRODUCT (DELETE)*/
//router.delete('/delete/:id', productController.destroy);


module.exports = router;