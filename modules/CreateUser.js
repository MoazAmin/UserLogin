//npm packages
const mongoose = require('mongoose')
const Joi = require("joi")
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema_mongoose = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        minlength : 5,
        maxlength : 50,
    },
    email: {
        type: String,
        required : true,
        unique: true,
        minlength : 5,
        maxlength : 50
    },
    password: {
        type: String,
        required : true,
        minlength : 5,
        maxlength : 1024,
    }
})
userSchema_mongoose.methods.generateAuthToken = function() {
    return jwt.sign({_id:this._id}, config.get('jwtPrivateKey'))
}

const User = mongoose.model('user', userSchema_mongoose)



function validateUser(req) {
    const userSchema = Joi.object({
        name: Joi.string()
        .min(5)
        .max(50)
        .required().trim(),
    
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(5).max(255).required().trim(),
        
        email: Joi.string()
        .min(5)
        .max(250)
        .email()
        .required()
    })
    return userSchema.validate(req)
}

// req = {
//     name        : "moazamin",
//     email       : "moazamin06@gmail.com",
//     password    : "moazamin06"  
// }

// const {error, value } = validateUser(req)

// console.log(error)
// console.log(value)


module.exports.User = User
module.exports.validateUser = validateUser
