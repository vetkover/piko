const mongo = require('./mongo.js')

async function userAvatar(username){

    let mongoresult = await mongo.db('piko').collection('users').findOne({
        "username": username
    })
      return await mongoresult.avatar
}

module.exports = userAvatar;