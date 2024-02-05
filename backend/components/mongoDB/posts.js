const mongo = require('./mongo.js')

async function posts(username){

    let mongoresult = mongo.db('piko').collection('posts').findOne({
        "username": username
    })
      return await mongoresult
}

module.exports = posts;