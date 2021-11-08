var express = require('express');
const petrol_controlers= require('../controllers/petrol');
var router = express.Router();
/* GET costumes */
router.get('/', petrol_controlers.petrol_view_all_Page );
module.exports = router;