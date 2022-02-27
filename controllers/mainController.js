const fs = require('fs');
const path = require('path');
const db = require('../database/models/index');
//const productsDataPath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsDataPath, 'utf-8'));

const genericController = {
    home: (req, res) => {
        res.render('home') 
    },
    
        /* search: (req, res) => {
        res.render('result', {
            products
        })
        }*/
    
    admin: (req, res) => {
        res.render('admin')
    }
};
module.exports = genericController;

