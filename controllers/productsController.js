const fs = require('fs');
const path = require('path');

const productsDataPath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsDataPath, 'utf-8'));

const productController = {
showAll: (req, res) => {
    res.render('products')

},

/*search: (req, res) => {
  let busquedaDelUsuario = req.query.search;
  res.send(busquedaDelUsuario);  
},

showDetail: (req, res) => {
    res.send("productDetail/id:", {products:products})
},

create: (req, res) => {
    res.send("createProduct", {detail:detail})
},

update: (req, res) => {
    res.render("editProduct", {detail:detail})
},

destroy: (req, res) => {
    res.redirect("products", {detail:detail})
},
*/
};

module.exports = productController;