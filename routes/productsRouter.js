const express = require('express');
const router = express.Router();
const upLoadFile = require('../middlewares/productMulterMiddleware');
const prodCreVal = require ('../middlewares/productValMiddleware') 
const productController = require('../controllers/productsController');


//********(C) CREAR NUEVO PRODUCTO********//
router.get('/productCreate', productController.createProduct);
router.post('/productCreate', upLoadFile.single('prodImage'), prodCreVal, productController.saveNewProduct);

//********(R) MOSTRAR LISTADO DE PRODUCTOS********//
router.get('/products', productController.showAll);

//********DETALLE DE PRODUCTO********//
router.get('/productDetail/:product_id/', productController.showDetail);

//********(U) EDITAR PRODUCTO********//
router.get('/productEdit/:product_id', productController.editProduct);
router.put('/productEdit/:product_id/', productController.updateProduct);

//********(D) BORRAR PRODUCTO********//
router.delete('/productDelete/:product_id', productController.deleteProduct);

//********BUSCAR PRODUCTO********//
//router.get('/productSearch', productController.search);


module.exports = router;