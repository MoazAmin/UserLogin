//npm packages
const express = require("express");
const mongoose = require('mongoose')
const config = require('config')

const app = express();
mongoose.set('strictQuery', true);
if(!config.get('jwtPrivateKey')) {
    console.error("FATALERROR: jwtPrivateKey is not defined")
    process.exit(1)
}

//Modules
app.use(express.json());
const home = require("./routes/home");
app.use("/", home);
const createUser = require('./routes/CreateUser')
app.use('/api/users',createUser)
const auth = require('./routes/auth')
app.use('/api/auth',auth)


mongoose.connect('mongodb://127.0.0.1:27017/user_login')
.then(() => console.log('Connection to DataBase Succesful'))
.catch(() => console.log('Connection to DataBase failed'))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
