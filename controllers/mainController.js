const fs = require('fs');
const path = require('path');
const db = require('../database/models/index');
//const productsDataPath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsDataPath, 'utf-8'));

const genericController = {

//********MOSTRAR HOMEPAGE********//
    home: (req, res) => {
        res.render('home') 
    },

//********MOSTRAR "QUIENES SOMOS"********//
    aboutUs: (req, res) => {
        res.render('aboutUs')
    },

//********MOSTRAR "CONTACTO"********//
    contact: (req, res) => {
        res.render('contact')
    },

//********MOSTRAR PANEL DE ADMINISTRADOR********//
    admin: (req, res) => {
        res.render('admin')
    }
};

module.exports = genericController;

