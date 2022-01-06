const express = require("express");
const router = express.Router();
const seedProjects = require("../seedData/seedProjects");
const Projects = require("../models/projects");
const passport = require('passport')
// const Users = require("../models/users");



//! SEED

router.get("/seed", (req, res) => {



    Projects.create(seedProjects, (err, createdSeedUsers) => {
        if (err) {
            res.status(400).json({error: "Error creating"})
        }
        else {
            res.status(202).json(createdSeedUsers);
        }
    });
    
})

//! INDEX

router.get("/", (req, res) => {
    Projects.find({}, (err, foundProjects) => {
        if (err) {
            res.status(400).json({error: "Error searching"})
        }
        else {
            res.status(200).json(foundProjects);
        }
    }).populate('posted_by', { _id: 0 , username: 1, display_name: 1, occupation: 1});
    
    
})


// CREATE

router.post("/", passport.authenticate('jwt', {session : false}),(req,res) => {
    req.body.goal = req.body.goal.split(",")
    req.body.components = req.body.components.split(",")

    Projects.create(req.body, (err, createdProject) => {
        if (err) {
            res.status(400).json({error: "Error adding"})
        }
        else {
            res.status(200).json(createdProject)
        }
    })
})

//UPDATE 

router.put("/:id", passport.authenticate('jwt', {session : false}),(req,res) => {
    const { id } = req.params
    req.body.goal = req.body.goal.split(",")
    req.body.components = req.body.components.split(",")
    const updatedProjectDetails = req.body

    Projects.findByIdAndUpdate(id, updatedProjectDetails, {new:true}, (err, updateProject) => {
        if (err) {
            res.status(400).json({error: "Error adding"})
        }
        else {
            res.status(200).json(updateProject)
        }
    })
})

// DESTROY

router.delete("/:id",  passport.authenticate('jwt', {session : false}),(req,res) => {
    const {id} = req.params;

    Projects.findByIdAndDelete(id, (err, deletedProject) => {
        if (err) {
            res.status(400).json({error: "Error deleting"}) 
        }
        else {
            res.status(200).json(deletedProject)
        }
    })
})

// SHOW 

router.get("/:id", passport.authenticate('jwt', {session : false}),(req,res) => {

    Projects.findById(req.params.id, (err, foundProjects) => {
        if (err) {
            res.status(400).json({error: "Error searching"})
        }
        else {
            res.status(200).json(foundProjects)
        }
    }).populate('posted_by', { _id: 1 , username: 1, display_name: 1, occupation: 1})
})

// SHOW for Project Edit

router.get("/edit/:id", passport.authenticate('jwt', {session : false}),(req,res) => {

    Projects.findById(req.params.id, (err, foundProjects) => {
        if (err) {
            res.status(400).json({error: "Error searching"})
        }
        else {
            foundProjects.goal = foundProjects.goal.join(",")
            foundProjects.components = foundProjects.components.join(",")

            res.status(200).json(foundProjects)
        }
    })
}) 

module.exports = router;

