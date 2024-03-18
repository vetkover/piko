const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const deleteMessage = require('../../components/mongoDB/deleteMessage.js')
const chatMember = require('../../components/mongoDB/chatMember.js')
const chatUpdate = require('../../components/websocket/ws.js')

router.get("/deletemessage/:chatId", async (req, res) => {
    let chatId = req.params.chatId; 
    let messageId = req.query.messageId; 
    const cookie = parseCookies(req.headers.cookie);
    if(cookie){
        const DBuserData = await userData(cookie.token);

        const resObj = {
            "messageId": messageId
        }

        if(DBuserData){
            if(await chatMember(chatId,DBuserData.username)){
                deleteMessage(chatId, messageId)
            chatUpdate(`/chats/${chatId}`, resObj, "deleteMessage")
            res.json(true);
            } else{
                res.json({ message: "you don't have access to chat" });
            }
        } else {
            res.json({ message: "notAuth" });
        }
    } else {
        res.json({ message: "noCookie" });
    }
});

module.exports = router;
