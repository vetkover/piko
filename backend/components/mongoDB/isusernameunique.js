const mongo = require('./mongo.js')

async function isusernameunique(username){
    let user = await mongo.db('piko').collection('users').findOne({
        "username": username
    });
    return !(user && user.username);
}

module.exports = isusernameunique;
