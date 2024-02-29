const mongo = require('./mongo.js')

async function clearTemp(){
    const maxAge = Date.now() - (2 * 60 * 60 * 1000); 

    const result = await mongo.db('piko').collection('cdn').deleteMany({
        tempType: { $exists: true },
        createTime: { $lt: maxAge }
    });

    console.log(result.deletedCount + ' - temp file was expired.');
    return result;
}

module.exports = clearTemp;
