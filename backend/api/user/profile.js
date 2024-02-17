const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
const changeProfile = require('../../components/mongoDB/changeProfile.js')
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')

router.post("/profile", async (req, res) => {
    const cookie = parseCookies(req.headers.cookie);
    if(cookie){
        const DBuserData = await userData(cookie.token)

        if(DBuserData){
            const data = req.body
            changeProfile(DBuserData.username, req.body)
            res.json(data);
        } else {
            res.json({ message: "notAuth" });
        }
    } else {
        res.json({ message: "noCookie" });
    }
});

module.exports = router;
