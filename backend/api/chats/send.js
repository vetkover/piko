const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const sendMessage = require('../../components/mongoDB/sendMessage.js')
const chatMember = require('../../components/mongoDB/chatMember.js')
const chatUpdate = require('../../components/websocket/ws.js')

router.post("/send/:chatId", async (req, res) => {
    let chatId = req.params.chatId; 
    let body = req.body
    const cookie = parseCookies(req.headers.cookie);
    if(cookie){
        const DBuserData = await userData(cookie.token);

        const resObj = {}

        let obj = {
            author: DBuserData.username,
            createTime: Date.now(),
            text: body.text,
            messageId: Math.random(),
            images: [],
            videos: [],
            sounds: [],
          }

        if(DBuserData){
            if(await chatMember(chatId,DBuserData.username)){
            sendMessage(chatId, body.text, DBuserData.username)
            chatUpdate(`/chats/${chatId}`, obj)
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
