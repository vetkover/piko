const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')

router.get("/whoami", async (req, res) => {
    const cookie = parseCookies (req.headers.cookie);
    if(cookie){
    const DBuserData = await userData(cookie.token);

    const resObj = {}
    if(DBuserData){
    resObj.username = DBuserData.username
    resObj.nickname = DBuserData.nickname
    resObj.email = DBuserData.email
    resObj.avatar = DBuserData.avatar
    
    res.json(
        resObj
    )
    }
} else {
    res.json({
        message: "notAuth"
    }
    )
}
});

module.exports = router;
