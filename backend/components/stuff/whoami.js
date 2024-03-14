const parseCookies  = require('./cookieReader.js')

const userData = require('../mongoDB/userData.js')

async function whoami(token){

    if(token){
        const DBuserData = await userData(token);

        const resObj = {}
        if(DBuserData){
            resObj.username = DBuserData.username
            resObj.nickname = DBuserData.nickname
            resObj.email = DBuserData.email
            resObj.avatar = DBuserData.avatar
            resObj.baner = DBuserData.baner
            resObj.bio = DBuserData.bio

            return resObj
        } else {
            return false
        }
    }
}

module.exports = whoami;
