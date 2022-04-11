const path = require('path');
const db = require ('../database/models');
const { validationResult } = require("express-validator");


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
    var valResults = validationResult(req)
        if (!valResults.isEmpty()) {
            res.render("productCreate", {
                errorMsg: valResults.mapped(),
                oldData: req.body,
            })
          }; 
          db.Products.findOne({ where: { product_name: req.body.name } })
          .then(function(productInDb) {
          if (productInDb) {
            res.render("productCreate", {
              errorMsg: {
                  email: {
                      msg: "Este producto ya existe",
                },
            },
              oldData: req.body,
          })
      } else {
    
    db.Products.create ({
        product_name: req.body.name,
        description: req.body.description,
        product_category_id: req.body.products_cat,
        image: req.file.filename,
        price: req.body.price,
        uom_code: "UN",
    })
    console.log("DETALLES DEL BODY", req.body)
    res.redirect('/products')
    }
    })
    .catch(function(err){
        console.log(err)
    });
    },
 
//********EDITAR PRODUCTO (ADMIN)********//
editProduct: (req, res) => {
    let producto = db.Products.findByPk(req.params.product_id);

    let categorias = db.product_category.findAll();

    Promise.all([producto, categorias]).then(([productToEdit, category]) => {
      res.render("productEdit", { productToEdit: productToEdit, category: category });
    });
    // db.Users.update({ })
  },
//********GUARDAR LOS CAMBIOS********//
  updateProduct: (req, res) => {
    db.Products.update(
        {
            product_name: req.body.name,
            description: req.body.description,
            product_category_id: req.body.category,
            image: req.file.filename,
            price: req.body.price,
            uom_code: "UN",
        },
        {
          where: {
            id: req.params.user_id,
          },
        }
      );
    res.redirect("/editProduct/", + req.params.product_id);
},

//ELIMINA UN PRODUCTO//
deleteProduct: (req, res) => {
    db.Products.destroy({
        where: {
          product_id: req.params.product_id,
        },
      });
    res.redirect("/products", {detail:detail})
}

};

module.exports = productController;