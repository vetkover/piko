const mongo = require('./mongo.js')

async function chatMember(chatId,username){
    let mongoresult = await mongo.db('piko').collection('chats').findOne({
        "chatId": Number(chatId),
    })
    if(mongoresult?.accessUsers.some(accessUser => accessUser === username)){
        return true
    } else {
        return false
    }
}

module.exports = chatMember;