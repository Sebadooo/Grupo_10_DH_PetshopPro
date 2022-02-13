const fs = require('fs');
const path = require('path');

const productsDataPath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsDataPath, 'utf-8'));

const mainController = {
    home: (req, res) => {
        res.render('views/home') 
    }
    
        /* search: (req, res) => {
        res.render('result', {
            products
        })
        }*/
    };

module.exports = mainController;

