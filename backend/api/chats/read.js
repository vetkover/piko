const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const readChat = require('../../components/mongoDB/readChat.js')
const chatMember = require('../../components/mongoDB/chatMember.js')
const readMessageByID = require('../../components/mongoDB/readMessageByID.js')

router.get("/read/:chatId", async (req, res) => {
    let chatId = req.params.chatId;
    const cookie = parseCookies(req.headers.cookie);
    if(cookie ){
        const DBuserData = await userData(cookie.token);
        if(await chatMember(chatId,DBuserData.username)){

            let messageArr = await readChat(chatId)
            let activeMessage = messageArr.filter(object=> object.status === "active")
            let sendMessage = await Promise.all(activeMessage.map(async (obj, index)=>{
                if(obj.replyId != null){
                    let answerMessageData = await readMessageByID(chatId, obj.replyId)
                    return{
                        ...obj,
                        answerMessage:{
                            status: answerMessageData.status === "active"? true : false,
                            anAuthor: answerMessageData.author,
                            anText: answerMessageData.text
                        }
                    }
                } else {
                    return obj
                }
            }))

            if(DBuserData){
                res.json( sendMessage);
            } else {
                res.json({ message: "notAuth" });
            }
        }

    } else {
        res.json({ message: "noCookie" });
    }
});

module.exports = router;
