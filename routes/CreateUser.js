const jwt = require('jsonwebtoken')
const config = require('config')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')

//modules
const { User , validateUser } = require('../modules/CreateUser')

router.get('/', async (req, res) => {
    const users = await User.find().select({name: 1})
    res.send(users)
})

router.post('/', async (req,res) => {
    const { error , value } = validateUser(req.body)
    if(error) return res.status(400).send(error.message)


    let user = await User.findOne({email : req.body.email})
    .catch((er) => console.log(er))
    if(user !== null) return res.status(400).send("User already registered")

    
    user =  new User(_.pick(req.body, ['name','email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)

    user = await user.save() 
    const token =  user.generateAuthToken()

    return res.header('x-auth-toekn',token).send(_.pick(user, ['_id','name','email']))
})

module.exports = router