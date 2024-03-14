const mongo = require('./mongo.js')

async function readChat(chatId) {
    try {
        let mongoresult = await mongo.db('piko').collection('chats').findOne(
          { "chatId": Number(chatId) });
        return mongoresult.messages;
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
      
  }
  

module.exports = readChat;