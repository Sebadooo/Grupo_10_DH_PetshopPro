const express = require ("express")
const router = express.Router();

const genericController = require('../controllers/mainController');

// GET Admin.
router.get("/admin", genericController.admin);
/* GET home page. */
router.get("/", genericController.home); 


//router.get('/', mainController.search);

module.exports = router;