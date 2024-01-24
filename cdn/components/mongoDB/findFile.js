const mongo = require('./mongo.js')

async function findFile(name){
    let request = await mongo.db('piko').collection('cdn').findOne({
        "name": name
    });
    return request;
}

module.exports = findFile;
