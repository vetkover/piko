const mongo = require('./mongo.js')

const path = require("path");
const fs = require('fs');
async function moveTempFile(tempToken){
    console.log(tempToken)
    let request = await mongo.db('piko').collection('cdn').findOne({
        "name": tempToken
    });

    async function isMovableItem(){

    if(request?.tempType != undefined && request?.tempType != ""){
        return true;
        } else { return false}
    }

    if(isMovableItem(tempToken)){

        let toPathFolder;
        switch(request.tempType){
            case'avatar':
                toPathFolder = 'users'
            break;

            case'baner':
                toPathFolder = 'users'
            break;

            case'media':
                toPathFolder = 'media'
            break;
            
        }

        const toMain = path.dirname(process.mainModule.filename)

        const newPath = path.resolve(toMain,"root", (request.path).replace('temp/', `${toPathFolder}/`));
        const oldPath = path.resolve(toMain,"root", request.path)
        fs.rename(oldPath, newPath, function(err) {
            if (err) throw err;
        })
        await mongo.db('piko').collection('cdn').updateOne(
            { "name": tempToken },
            { 
                $set: {path: (request.path).replace('temp/', `${toPathFolder}/`)},
                $unset: { tempType: "" } 
            }
        );
        return true;
    }

}

module.exports = moveTempFile;
