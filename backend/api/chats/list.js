const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const chatInfo = require('../../components/mongoDB/chatInfo.js')

router.get("/list", async (req, res) => {
    const cookie = parseCookies(req.headers.cookie);
    if(cookie){
        const DBuserData = await userData(cookie.token);

        const resObj = []
        if(DBuserData){

            for(let i = 0; i < DBuserData.chats; i++){
                let chatDB = await chatInfo(DBuserData.chats[i])
                console.log(chatDB.messages[chatDB.messages.length-1])
                let pushObj = {
                    chatId: chatDB.chatId,
                    chatName: "example",
                    chatLastMessage: chatDB.messages[chatDB.messages.length-1].text,
                    accessUsers: chatDB.accessUsers,
                    type: chatDB.type
                }
                resObj.push(pushObj)
            }
            

            res.json(resObj);
        } else {
            res.json({ message: "notAuth" });
        }
    } else {
        res.json({ message: "noCookie" });
    }
});

module.exports = router;
