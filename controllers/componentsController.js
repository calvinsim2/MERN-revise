const express = require("express");
const componentsRouter = express.Router();
const seedComponents = require("../seedData/seedComponents")
const Components = require("../models/components")
const passport = require('passport')

// SEED

componentsRouter.get("/seed", (req,res) => {
    Components.create(seedComponents, (err, addedComponents) => {
        if (err) {
            res.status(400).json({error: "Error added"})
        }
        else {
            res.status(200).json(addedComponents);
        }
    })
})

//! INDEX

componentsRouter.get("/",  (req, res) => {
    Components.find({}, (err, foundComponents) => {
        if (err) {
            res.status(400).json({error: "Error searching"})
        }
        else {
            res.status(200).json(foundComponents);
        }
    });
})

// SHOW 

componentsRouter.get("/:id", (req,res) => {

    Components.findById(req.params.id, (err, foundComponents) => {
        if (err) {
            res.status(400).json({error: "Error searching"})
        }
        else {
            res.status(200).json(foundComponents)
        }
    })
})

// CREATE

componentsRouter.post("/", passport.authenticate('jwt', {session : false}),(req,res) => {

    Components.create(req.body, (err, createdComponent) => {
        if (err) {
            res.status(400).json({error: "Error adding"})
        }
        else {
            res.status(200).json(createdComponent)
        }
    })
})

//UPDATE 

componentsRouter.put("/:id", passport.authenticate('jwt', {session : false}),async (req,res) => {
    const { id } = req.params
    const updatedComponentDetails = req.body

    Components.findByIdAndUpdate(id, updatedComponentDetails, {new:true}, (err, updateComponent) => {
        if (err) {
            res.status(400).json({error: "Error adding"})
        }
        else {
            res.status(200).json(updateComponent)
        }
    })
})

// DESTROY

componentsRouter.delete("/:id", passport.authenticate('jwt', {session : false}),(req,res) => {
    const {id} = req.params;

    Projects.findByIdAndDelete(id, (err, deletedComponents) => {
        if (err) {
            res.status(400).json({error: "Error deleting"}) 
        }
        else {
            res.status(200).json(deletedComponents)
        }
    })
})

module.exports = componentsRouter;


