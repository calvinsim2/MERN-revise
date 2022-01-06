const mongoose = require("mongoose");

const ComponentsSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    img: String,
    rating: String,
    
})

const Components = mongoose.model("Components", ComponentsSchema);

module.exports = Components;