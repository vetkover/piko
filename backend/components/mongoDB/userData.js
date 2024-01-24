const mongo = require('./mongo.js')

async function userData(token){

    let mongoresult = mongo.db('piko').collection('users').findOne({
        "sessions.token": token
    })
      return await mongoresult
}

module.exports = userData;