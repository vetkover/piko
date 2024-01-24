const mongo = require('./mongo.js')

async function p(username){

    let mongoresult = mongo.db('piko').collection('users').findOne({
        "username": username
    })
      return await mongoresult
}

module.exports = p;