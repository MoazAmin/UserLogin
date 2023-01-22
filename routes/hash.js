const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const hashed = async function hashPassword(userPassword) {
    const hash = await bcrypt.hash(userPassword, saltRounds)
    return hash
}


const unhash = async function unHashPassword(hash) {
    bcrypt.compare("12345", hash, function(err, result) {
        // result == true
        if(result === "12345") return true 
        else
        return false
    });
}


const rez = hashed("12345").then()

unhash(rez).then((r) => console.log(r))