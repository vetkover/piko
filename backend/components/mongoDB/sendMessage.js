const mongo = require('./mongo.js')

async function sendMessage(chatId, text, author) {
    console.log(chatId)
    try {
        let mongoresult = await mongo.db('piko').collection('chats').updateOne(
          { "chatId": Number(chatId) },
          {
            $push: {
              messages: {
                createTime: Date.now(),
                text: text,
                author: author
              }
            }   
          }
        );
        console.log(mongoresult);
        return mongoresult;
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
      
  }
  

module.exports = sendMessage;