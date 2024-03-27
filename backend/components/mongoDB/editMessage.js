const mongo = require('./mongo.js');

async function editMessage(chatId, messageId, newText) {
    try {

        const result = await mongo.db('piko').collection('chats').updateOne(
            { "chatId": Number(chatId), "messages.messageId": Number(messageId) },
            {
                $set: {
                    "messages.$.text": newText
                }
            }
        );

        if (result.modifiedCount === 0) {
            console.error('сообщение не существует');
            return false;
        }

        return result;
    } catch (error) {
        console.error('Ошибка при обновлении текста сообщения:', error);
        return false;
    }
}

module.exports = editMessage;
