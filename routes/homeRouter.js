const express = require ("express")
const router = express.Router();


const genericController = require('../controllers/mainController');

//********GET HOMEPAGE********//
router.get("/", genericController.home); 

//********GET ADMINISTRAR********//
router.get("/admin", genericController.admin);

//********GET "NOSOTROS"********//
router.get("/aboutUs", genericController.aboutUs); 

//********GET "CONTACTO"********//
router.get("/contact", genericController.contact); 

module.exports = router;