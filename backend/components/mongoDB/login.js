const mongo = require('./mongo.js')

async function login(username, password){
    try {
        let response = await mongo.db('piko').collection('users').findOne({
            "password": password,
            "username": username
        })
        return response !== null && response !== undefined;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = login;
