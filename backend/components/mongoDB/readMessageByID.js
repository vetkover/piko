const mongo = require('./mongo.js');

async function readMessageByID(chatId, messageId) {
  try {
    const chatDocument = await mongo.db('piko').collection('chats').findOne({ "chatId": Number(chatId) });
    if (chatDocument && chatDocument.messages) {
      const filteredMessages = chatDocument.messages.filter((message) => message.messageId == messageId);
      return filteredMessages[0];
    }
    return null;
  } catch (error) {
    console.error('Ошибка при поиске сообщения:', error);
  }
}

module.exports = readMessageByID;
