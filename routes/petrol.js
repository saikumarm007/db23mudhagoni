var express = require('express');
const petrol_controlers= require('../controllers/petrol');
var router = express.Router();
/* GET petrols */
router.get('/', petrol_controlers.petrol_view_all_Page );
module.exports = router;

/* GET detail petrol page */ 
router.get('/detail', petrol_controlers.petrol_view_one_Page);
 
/* GET create petrol page */ 
router.get("/create", petrol_controlers.petrol_create_Page); 

/* GET create update page */ 
router.get("/update", petrol_controlers.petrol_update_Page);

/* GET create costume page */ 
router.get("/delete", petrol_controlers.petrol_delete_Page);