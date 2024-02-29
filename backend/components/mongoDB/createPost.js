const mongo = require('./mongo.js')

async function createPost(postObj){

    async function getNewId() {

        const mongoDBrequest = await mongo.db('piko').collection('posts').findOne({ config: "" });
        const oldIdCounter = mongoDBrequest.idCounter;

        await mongo.db('piko').collection('posts').updateOne(
          { config: "" },
          { $set: { idCounter: oldIdCounter + 1 } }
        );
            
        return oldIdCounter;
      }

      let mongoresult = mongo.db('piko').collection('posts').updateOne({
        "username": postObj.username
    },
    {$push: {
        posts: {
            $each: [{
                text: postObj.text,
                images: postObj.images,
                date: postObj.date,
                sounds: postObj.sounds,
                video: postObj.video,
                status: "active",
                id: await getNewId()
            }],
            $position: 0
        }
    }})
        return await mongoresult
}

module.exports = createPost;
