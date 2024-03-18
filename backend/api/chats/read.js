const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const readChat = require('../../components/mongoDB/readChat.js')
const chatMember = require('../../components/mongoDB/chatMember.js')

router.get("/read/:chatId", async (req, res) => {
    let chatId = req.params.chatId;
    const cookie = parseCookies(req.headers.cookie);
    if(cookie ){
        const DBuserData = await userData(cookie.token);
        if(await chatMember(chatId,DBuserData.username)){

            let messageArr = await readChat(chatId)
            let sendMessage = messageArr.filter(object=> object.status === "active")
            if(DBuserData){
    
                res.json(sendMessage);
            } else {
                res.json({ message: "notAuth" });
            }
        }

    } else {
        res.json({ message: "noCookie" });
    }
});

module.exports = router;
