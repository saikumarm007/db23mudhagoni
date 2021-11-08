var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var petrol_controller = require('../controllers/petrol');
/// API ROUTE ///
// GET resources base.
router.get('/resource', api_controller.api);
/// petrol ROUTES ///
// POST request for creating a petrol.
router.post('/resource/petrol', petrol_controller.petrol_create_post);
// DELETE request to delete petrol.
router.delete('/resource/petrol/:id', petrol_controller.petrol_delete);
// PUT request to update petrol.
router.put('/resource/petrol/:id', petrol_controller.petrol_update_put);
// GET request for one petrol.
router.get('/resource/petrol/:id', petrol_controller.petrol_detail);
// GET request for list of all petrol items.
router.get('/resource/petrol', petrol_controller.petrol_list);
module.exports = router;