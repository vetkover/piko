const mongo = require('./mongo.js');

async function sendMessage(chatId, body, author) {

    try {
        const chat = await mongo.db('piko').collection('chats').findOne({ "chatId": Number(chatId) });
        const currentMessageCount = chat.messages ? chat.messages.length : 0;

        let messageObj = {
          createTime: Date.now(),
          text: body.text,
          replyId: body.replyId,
          edit: false,
          author: author,
          messageId: currentMessageCount + 1,
          status: "active"
        }


        let mongoresult = await mongo.db('piko').collection('chats').updateOne(
            { "chatId": Number(chatId) },
            {
                $push: {
                    messages: messageObj
                }   
            }
        );
        return messageObj;
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }
}

module.exports = sendMessage;
