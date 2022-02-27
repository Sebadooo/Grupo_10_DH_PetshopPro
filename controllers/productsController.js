const fs = require('fs');
const path = require('path');
const db = require ('../database/models');

const productController = {
//MUESTRA TODOS LOS PRODUCTOS
    showAll: (req, res) => {
        db.products.findAll({ 
            include: [{association: "products_cat"}]})
        .then (function(products){
            res.render('products', {products:products}); 
        })
        .catch (function(err){  
console.log(err)        
})
    },
//MUESTRA EL DETALLE DE UN PRODUCTO//
showDetail: (req, res) => {
    db.product.findByPk(req.params.id,{
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
create: (req, res) => {
    db.Products.findAll()
        .then (function(product_category) {
            return res.render('products', {product_category:product_category});
        });
    res.render("createProduct", {detail:detail})
},
//GUARDA EL PRODUCTO CREADO//
saveNewProduct: (req, res) => {
    db.Products.create ({
        product_name: req.body.name,
        description: req.body.description,
        product_category_id: req.body.category,
        price: req.body.price
    })
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