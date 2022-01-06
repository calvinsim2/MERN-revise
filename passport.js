// npm install passport
// npm install passport-local --> this installs local strategy. 
// local strategy is used to authenticate against the database using username and password.
// npm install passport-jwt

// passport is our authentication middleware
const passport = require('passport')
// local strategy is how we are going to be authenticating against
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy

const Users = require('./models/users')


// extracting jwt from the request
const cookieExtractor = (req) => {
    let token = null
    // if there is a request object, and request cookies is not empty, 
    if (req && req.cookies) {
        token = req.cookies["access"]
    }
    return token
}

// middleware - used for authorization
// options object -> jwt request - cookie extractor , secretOrKey - key which we use to sign the token.
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "calvin"
},

(payload, done) => {
    // search by id, payload.sub will contain the id of the user.
    // extract this particular logged in user's data from db. 
    Users.findById({_id: payload.sub}, (err, user) => {
        if (err) {
            return done(err,false)
        }
        else if (user) {
            console.log(user)
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    })
}))



// middleware - authentication local strategy using username and password
// done --> function to be invoked when we are completed.
passport.use(new LocalStrategy((username,password,done) => {

    Users.findOne({username}, (err,user) => {
        // if db is not running etc. 
        if (err) {
            return done(err)
        }
        // if username is not found 
        else if (!user) {
            // no error, but there is no user is found.
            return done(null, false)
        }
        else {
            // if we found the user, we will want to check if password is correct. 
            // this comparePassword is the method we declared in the Userschema
            user.comparePassword(password,done)
        }
        
    })
}))