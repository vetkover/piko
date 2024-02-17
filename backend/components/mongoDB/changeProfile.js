const mongo = require('./mongo.js')

async function changeProfile(username, updateObject) {
  const collection = mongo.db('piko').collection('users');
  
  let update = {};
  if (updateObject?.avatar != null) {
    update.avatar = updateObject.avatar;
  }

  if (updateObject?.baner != null) {
    update.baner = updateObject.baner;
  }

  if (updateObject?.bio != null) {
    update.bio = updateObject.bio;
  }

  const result = await collection.updateOne(
    { "username": username },
    { $set: update }
  );
  
  return result;
}

module.exports = changeProfile;
