const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const chatInfo = require('../../components/mongoDB/chatInfo.js')
const chatMember = require('../../components/mongoDB/chatMember.js')
const userAvatar = require('../../components/mongoDB/userAvatar.js')

router.get("/info/:chatId", async (req, res) => {
    let chatId = req.params.chatId;
    const cookie = parseCookies(req.headers.cookie);
    if(cookie ){
        const DBuserData = await userData(cookie.token);
        if(await chatMember(chatId,DBuserData.username)){

            let chatData = await chatInfo(chatId)
            let users = {}

            for(let i = 0; i< chatData.accessUsers.length; i++){
                const userAvatarToken = {src: await userAvatar(chatData.accessUsers[i])}
                users[chatData.accessUsers[i]] = userAvatarToken
            }

            let resObj = {}
            resObj.accessUsers = chatData.accessUsers
            resObj.chatId = chatData.chatId
            resObj.type = chatData.type
            resObj.aboutUsers = users
            if(DBuserData){
    
                res.json(resObj);
            } else {
                res.json({ message: "notAuth" });
            }
        }

    } else {
        res.json({ message: "noCookie" });
    }
});

module.exports = router;
