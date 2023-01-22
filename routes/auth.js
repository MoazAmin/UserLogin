
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')

//modules
const {User} = require('../modules/CreateUser')

router.post('/', async (req,res) => {
    const { error , value } = validateUser(req.body)
    if(error) return res.status(400).send(error.message)


    let user = await User.findOne({email : req.body.email})
    .catch((er) => console.log(er))
    if(user === null) return res.status(400).send("Incorrect E-mail or password")
    

    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    if(!validatePassword) return res.send("Incorrect E-mail or password")

    const token = user.generateAuthToken()
    return res.send(token)

})

function validateUser(req){
    const userSchema = Joi.object({
        name: Joi.string()
        .min(5)
        .max(50)
        .required().trim(),
        
        email: Joi.string()
        .min(5)
        .max(250)
        .email()
        .required(),
        password:  Joi.string()
    })
    return userSchema.validate(req)
}


module.exports = router