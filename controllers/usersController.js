const express = require("express");
const usersRouter = express.Router();
const bcrypt = require('bcrypt')
const seedUsers = require("../seedData/seedUsers")
const passport = require('passport')
const passportConfig = require('../passport')
const Users = require("../models/users")
const Projects = require("../models/projects")

// npm install jsonwebtoken
const JWT = require('jsonwebtoken')

const signToken = (userID) => {
    // returns the actual JWT
    // second key, need to match the secretOrKey to ensure that the token is legitimate.
    return JWT.sign({
        iss : "calvin",
        sub : userID
    }, "calvin", {expiresIn : "1h"})
}

// SEED 

usersRouter.get("/seed", (req,res) => {
    Users.create(seedUsers, (err, addUsers) => {
        if (err) {
            res.status(400).json({error: "Unable to add users"})
        }
        else {
            res.status(200).json(addUsers)
        }
    })
})

// INDEX

usersRouter.get("/", (req,res) => {
    Users.find({}, (err, foundUsers) => {
        if (err) {
            res.status(400).json({error: "Unable to find"})
        }
        else {
            res.status(200).json(foundUsers)
        }
    })
})



// CREATE 

usersRouter.post("/", (req,res) => {

    req.body.username = req.body.username.toLowerCase()
    
    // check if username is taken, before creating.
    Users.find( {username: req.body.username}, (err, findUser) => {
        if (err) {
            res.status(400).json({error: "Error creating"})
        }
        else {
            
            if (findUser.length < 1) {
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
                const {username, password, img, display_name,occupation} = req.body
                const newUser = new Users({username,password, img, display_name,occupation})
                newUser.save( (err) => {
                if (err) {
                    res.status(500).json({message : {msgBody: "Error has occured", msgError : true}})
                }
                else {
                    res.status(201).json({message : {msgBody: "Account successfully created", msgError : false}})
                }
            })
            }
            else {
                res.status(405).json({error: "Username is taken"})
            }
        }
    })
})

// local --> means use LocalStrategy
// After successful authentication, Passport will establish a persistent login session. But this isn't necessary here,
// thus we set session : false.
usersRouter.post('/login', passport.authenticate('local', {session : false}),(req,res) => {
    if (req.isAuthenticated()) {
        // remember in comparePassword method, the user is returned if it is logged in(authenticated)
        const {_id, username, img, is_admin, display_name, occupation} = req.user
        const token = signToken(_id)
        // httpOnly --> on the client side, they cant change this cookie using javascript
        // sameSite ---> prevent against cross site attacks
        res.cookie('access', token, {httpOnly: true, sameSite: true})
        res.status(200).json({ _id, username, img, is_admin, display_name, occupation })
    }
    else {
        res.status(400).json("Invalid details entered")
    }
})

usersRouter.get('/logout', passport.authenticate('jwt', {session : false}),(req,res,next) => {
    
    // clearing cookies.
    res.clearCookie('access');
    res.json("Logged out successfully")
})

// EDIT / UPDATE

usersRouter.put("/:id", passport.authenticate('jwt', {session : false}),(req,res) => {


    Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser) => {
        if (err) {
            res.status(400).json({error: "User cant be updated"})
        }
        else {
            res.status(200).json(updatedUser)
        }
    })
})


// DELETE

usersRouter.delete("/:id", passport.authenticate('jwt', {session : false}),(req,res, next) => {

    
    Users.findById(req.params.id, (err, deleteUser) => {
        Projects.remove({
            "posted_by": { $in: deleteUser._id}
        }, (err) => {
            if (err) {
                res.status(400).json(next(err))
            }
            else {
                deleteUser.remove();
                res.status(200).json(deleteUser)
            }
        })
    })
})

// this route is created for persistence. 
usersRouter.get('/authenticated', passport.authenticate('jwt', {session : false}),(req,res,next) => {
    
    const { _id, username, img, is_admin, display_name, occupation } = req.user
    res.status(200).json( { _id, username, img, is_admin, display_name, occupation })
})

// SHOW

usersRouter.get("/:id", passport.authenticate('jwt', {session : false}),(req,res) => {

    Users.findById(req.params.id, (err, foundUser) => {
        if (err) {
            res.status(400).json({error: "Cant find user"})
        }
        else {
            res.status(200).json(foundUser)
        }
    })
})


module.exports = usersRouter

