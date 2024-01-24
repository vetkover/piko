const mongo = require('./mongo.js')

async function isnicknameunique(nickname){
    let user = await mongo.db('piko').collection('users').findOne({
        "nickname": nickname
    });
    return !(user && user.nickname);
}

module.exports = isnicknameunique;
