const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
const changeProfile = require('../../components/mongoDB/changeProfile.js')
const p = require('../../components/mongoDB/p')

const moveTempFile = require('../../yggdrasil/sending/cdn/moveTempFile.js')
const deleteFile = require('../../yggdrasil/sending/cdn/deleteFile.js')

router = express.Router();

const userData = require('../../components/mongoDB/userData.js')

router.post("/profile", async (req, res) => {
    const cookie = parseCookies(req.headers.cookie);
    if(cookie){
        const DBuserData = await userData(cookie.token)
        if(DBuserData){
            const promises = Object.keys(req.body).map(async (key, index)=>{
                const data = req.body[key];
                if(data != null && key != "bio"){
                    const dataObject ={
                        username: DBuserData.username,
                        tempToken: data
                    }
                    const oldPath = await p(DBuserData.username)
                    await moveTempFile(dataObject)
                    await changeProfile(DBuserData.username, req.body)
                    await deleteFile(oldPath[key])
                    return data;
                }
            })
            const results = await Promise.all(promises);
            res.json(results);
        } else {
            res.json({ message: "notAuth" });
        }
    } else {
        res.json({ message: "noCookie" });
    }
});

module.exports = router;
