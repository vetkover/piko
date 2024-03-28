const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const sendMessage = require('../../components/mongoDB/sendMessage.js')
const chatMember = require('../../components/mongoDB/chatMember.js')
const chatUpdate = require('../../components/websocket/ws.js')
const editMessage = require('../../components/mongoDB/editMessage.js');
const readMessageByID = require("../../components/mongoDB/readMessageByID.js");

router.post("/send/:chatId", async (req, res) => {
    let chatId = req.params.chatId; 
    let body = req.body
    const cookie = parseCookies(req.headers.cookie);
    if(cookie){
        const DBuserData = await userData(cookie.token);

        const resObj = {}

        let messageObj = {
            author: DBuserData.username,
            createTime: Date.now(),
            text: body.text,
            messageId: 0,
            replyId: body.replyId? body.replyId : null,
            edit: false,
            images: [],
            videos: [],
            sounds: [],
          }

        if(DBuserData){
            if(await chatMember(chatId,DBuserData.username)){
            messageObj.messageId = (await sendMessage(chatId, body, DBuserData.username)).messageId
            chatUpdate(`/chats/${chatId}`, messageObj, "newMessage")
            res.json(true);
            }
        } else {
            res.json({ message: "notAuth" });
        }
    } else {
        res.json({ message: "noCookie" });
    }
});

router.patch("/send/:chatId", async (req, res) => {
    let chatId = req.params.chatId; 
    let body = req.body
    let messageId = req.query.messageId;
    const cookie = parseCookies(req.headers.cookie);
    if(cookie){
        const DBuserData = await userData(cookie.token);

        if(DBuserData){
            const messageBeforeEditing = await readMessageByID(chatId, messageId)
            if(await chatMember(chatId,DBuserData.username) && messageBeforeEditing.author === DBuserData.username){
            await editMessage(chatId, messageId, body.text)

            let messageObj = {
                author: messageBeforeEditing.author,
                createTime: messageBeforeEditing.createTime,
                text: body.text,
                messageId: messageBeforeEditing.messageId,
                replyId: messageBeforeEditing.replyId? messageBeforeEditing.replyId : null,
                edit: true,
                images: [],
                videos: [],
                sounds: [],
              }

            chatUpdate(`/chats/${chatId}`, messageObj, "editMessage")
            res.json(true);
            }
        } else {
            res.json({ message: "notAuth" });
        }
    } else {
        res.json({ message: "noCookie" });
    }
});


module.exports = router;
