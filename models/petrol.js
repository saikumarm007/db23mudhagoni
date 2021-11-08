const mongoose = require("mongoose") 
const petrolSchema = mongoose.Schema({ 
 petrol_type: String, 
 quantity: Number, 
 cost: Number 
}) 
 
module.exports = mongoose.model("Petrol", petrolSchema)