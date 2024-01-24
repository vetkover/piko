const mongo = require('./mongo.js')

async function ismailunique(email){
    let user = await mongo.db('piko').collection('users').findOne({
        "email": email
    });
    return !(user && user.email);
}

module.exports = ismailunique;
