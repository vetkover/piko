const mongo = require('./mongo.js')

async function signIn(username, nickname, password, email){
    try {
    await mongo.db('piko').collection('users').insertOne({
            "username": username,
            "password": password,
            "nickname": nickname,
            "bio": "",
            "avatar": "avatar",
            "chats": 0,
            "sessions": [],
            "email": email
            
        })
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = signIn;
