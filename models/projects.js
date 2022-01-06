const mongoose = require("mongoose");

const ProjectsSchema = mongoose.Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    briefing: {type: String, required: true},
    goal: [String],
    description: {type: String, required: true},
    components: [String],
    posted_by: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
})

const Projects = mongoose.model("Projects", ProjectsSchema);

module.exports = Projects;

