const mongo = require('../mongoDB/mongo')
async function randomString() {
  const collection = mongo.db('piko').collection('cdn');

  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 25; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const existingDocument = await collection.findOne({ name: result });
  if (existingDocument) {
    return randomString();
  } else {
    return result;
  }
}

module.exports = randomString;
