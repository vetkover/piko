const mongo = require('./mongo.js')

async function tempUpload(fileObject){
    try {
        let request = await mongo.db('piko').collection('cdn').insertOne({
            originalName: fileObject.originalName,
            name: fileObject.name,
            path: fileObject.path,
            tempType: fileObject.tempType,
            createTime: Date.now()
        });
        return request;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = tempUpload;
