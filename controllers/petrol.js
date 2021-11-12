var Petrol = require('../models/petrol');
// List of all Petrol
exports.petrol_list = function (req, res) {
    res.send('NOT IMPLEMENTED: petrol list');
};
// for a specific petrol.
exports.petrol_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await Petrol.findById(req.params.id) 
        console.log(result);
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 
// Handle petrol create on POST.
exports.petrol_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Petrol();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"petrol_type":"regular", "quantity":13, "cost":43.56}
    document.petrol_type = req.body.petrol_type;
    document.quantity = req.body.quantity;
    document.cost = req.body.cost;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle petrol delete form on DELETE.
exports.petrol_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: petrol delete DELETE ' + req.params.id);
};
// Handle petrol update form on PUT.
exports.petrol_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: petrol update PUT' + req.params.id);
};

// List of all petrols
exports.petrol_list = async function (req, res) {
    try {
        thePetrol = await Petrol.find();
        res.send(thePetrol);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// VIEWS
// Handle a show all view
exports.petrol_view_all_Page = async function (req, res) {
    try {
        thePetrol = await Petrol.find();
        res.render('petrol', {
            title: 'petrol Search Results',
            results: thePetrol
        });
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Costume update form on PUT. 
exports.petrol_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await Petrol.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.petrol_type)  
        toUpdate.petrol_type = req.body.petrol_type; 
        if(req.body.quantity) toUpdate.quantity = req.body.quantity; 
        if(req.body.cost) toUpdate.cost = req.body.cost; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 


