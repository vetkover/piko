const fs = require('fs');
const mongo = require('./mongo.js')
const path = require("path");

async function deleteFile(name){
    if(!name.includes("default")){
        let request = await mongo.db('piko').collection('cdn').findOne({
            "name": name
        });
    
    const toMain = path.dirname(process.mainModule.filename)
    const oldPath = path.resolve(toMain,"root", request.path)

    fs.unlink(oldPath, (err) => {
        if (err) {
          console.error(err);
        }
      });


} else {
    return true
}
}
module.exports = deleteFile;
