const mongo = require('./mongo.js')

async function deletePost(postId){
    let mongoresult = await mongo.db('piko').collection('posts').updateOne(
        {"posts.id": postId},
        {
            $set: {"posts.$.status": "deleted"},
            $unset: {"posts.$.text": "", "posts.$.images": ""}
        }
    )
    return mongoresult;
}

module.exports = deletePost;
