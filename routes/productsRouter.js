const express = require('express');
const router = express.Router();
const fs = require ('fs');
const path = require ('path');
const multer = require ("multer");
const prodCreVal = require ('../middlewares/productValMiddleware') 
const productController = require('../controllers/productsController');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname,'../publics/images/products')
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        let imageName = file.fieldname + " " + Date.now() + path.extname(file.originalname)
        cb(null, imageName);
    }
})

const upLoadFile = multer ({ storage });

//const upLoadFile = require ('../middlewares/productMulterMiddleware');

//PÚBLICO//
/* GET ALL PRODUCTS (GET)*/
router.get('/products', productController.showAll);

/* PRODUCT DETAIL (GET)*/
router.get('/productDetail/:product_id/', productController.showDetail);

/* BUSQUEDA DE PRODUCTO (GET)*/
//router.get('/products', productController.search);

//ADMINISTRADOR//
/* GET ALL PRODUCTS (GET)*/
//router.get('/products', productController.index);

/* CREATE A PRODUCT (GET/POST)*/
router.get('/productCreate', productController.createProduct);
router.post('/productCreate', upLoadFile.single('prodImage'), productController.saveNewProduct);

/* GET EDIT PRODUCT (GET/PUT)*/
//router.get('/edit/:id', productController.edit);
//router.put('/edit/:id/', productController.update);

/* GET DELETE PRODUCT (DELETE)*/
//router.delete('/delete/:id', productController.destroy);


module.exports = router;