const mongo = require('../../components/mongoDB/mongo')


var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var passwordLength = 64;
var password = "";

function genRan(){
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
       return password;
}


async function tokenGenerate(username){
    password = "";
    let token = genRan();
    //const rememberMe = req.body.remember != undefined && req.body.remember ? ( Date.now() + 604800 ) : false;

    let result = await mongo.db('piko').collection('users').findOne({
        username: username,
        token: (token),
    })
    if (result == null)  {

        const query = { username: username };
        const update = { "$push": { "sessions": {"token": token} } }
        await mongo.db('piko').collection('users').updateOne(query, update);
        return token 
    }

}

exports.module = {tokenGenerate};