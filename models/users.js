const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UsersSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    img: { type: String, default: "/Portrait_Placeholder.png" },
    is_admin: {type: Boolean, default: false},
    display_name: {type: String, required: true},
    occupation: String,
    joined_date: {type: Date, default: Date.now},
})

// User methods.
UsersSchema.methods.comparePassword = function(password, callBack) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callBack(err)
        }
        else {
            // if password is wrong, return isMatch --> which is false.
            if (!isMatch) {
                return callBack(null, isMatch)
            }
            // if password is correct, we return this --> which contains the user details.
            return callBack(null, this)
        }
    })
}


const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;