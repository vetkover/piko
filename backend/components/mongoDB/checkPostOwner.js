const mongo = require('./mongo.js')

async function checkPostOwner(username, id){
    try {
        let response = await mongo.db('piko').collection('posts').findOne({
            "username": username,
            "posts": {
                $elemMatch: {
                    "id": Number(id)
                }
            }
        })
        return response !== null && response !== undefined;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = checkPostOwner;
