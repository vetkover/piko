const mongo = require('./mongo.js');

async function deleteMessage(chatId, messageId) {
    try {
        let mongoresult = await mongo.db('piko').collection('chats').updateOne(
            { 
                "chatId": Number(chatId),
                "messages.messageId": Number(messageId)
            },
            {
                $set: {
                    "messages.$.status": "removed"
                }
            }
        );

        return mongoresult;
    } catch (error) {
        console.error('Ошибка при удалении сообщения:', error);
    }
}

module.exports = deleteMessage;
