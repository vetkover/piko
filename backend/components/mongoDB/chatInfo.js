const mongo = require('./mongo.js')

async function chatInfo(chatId) {
    try {
        let mongoresult = await mongo.db('piko').collection('chats').findOne(
          { "chatId": Number(chatId) });
        return mongoresult;
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
      
  }
  

module.exports = chatInfo;