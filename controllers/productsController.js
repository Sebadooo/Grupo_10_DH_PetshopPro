const fs = require('fs');
const path = require('path');
const db = require ('../database/models');
const { validationResult } = require("express-validator");
const multer = require ("multer");
const upLoadFile = require ('../middlewares/productMulterMiddleware');


const productController = {
//MUESTRA TODOS LOS PRODUCTOS
    showAll: (req, res) => {
        db.Products.findAll({ 
            include: [{association: "products_cat"}]})
        .then (function(productos){
            res.render('products', {productos:productos}); 
        })
        .catch (function(err){  
console.log(err)        
})
    },
//MUESTRA EL DETALLE DE UN PRODUCTO//
showDetail: (req, res) => {
    db.Products.findByPk(req.params.product_id,{
        include: [{association: "products_cat"}]})
        .then (function(producto){
            res.render('productDetail', {producto:producto})
        })
        .catch ((function(err){
            console.log(err)
        })
    )
},
//CREA UN PRODUCTO//
createProduct: (req, res) => {
    db.Product_Category.findAll()
        .then (function (products_cat) {
            return res.render('productCreate', {products_cat:products_cat});
        })    
    .catch(function (e) {
                console.log(e);
              });
},
//GUARDA EL PRODUCTO CREADO//
saveNewProduct: (req, res) => {
    db.Products.create ({
        product_name: req.body.name,
        description: req.body.description,
        product_category_id: req.body.category,
        image: req.file.filename,
        price: req.body.price
    })
    console.log("DETALLES DE IMAGEN", req.file)
    res.redirect('/products')
},
//MODIFICA UN PRODUCTO//
update: (req, res) => {
    res.render("editProduct", {detail:detail})
},
//ELIMINA UN PRODUCTO//
destroy: (req, res) => {
    res.redirect("products", {detail:detail})
}

};

module.exports = productController;