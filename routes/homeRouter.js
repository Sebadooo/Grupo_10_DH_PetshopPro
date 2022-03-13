const express = require ("express")
const router = express.Router();
const db = require('../database/models/index');


const genericController = require('../controllers/mainController');

// GET Admin //
router.get("/admin", genericController.admin);
// GET home page //
router.get("/", genericController.home); 
// GET ABOUT US //
router.get("/aboutUs", genericController.aboutUs); 
// GET ABOUT US //
router.get("/contact", genericController.contact); 

module.exports = router;