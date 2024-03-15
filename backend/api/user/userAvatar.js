const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const userAvatar = require('../../components/mongoDB/userAvatar.js')

router.get("/useravatar/:username", async (req, res) => {
    try{
    let username = req.params.username; 
    let data = await userAvatar(username)

    res.json(data);
}catch(e){
    let obj = {}
    obj.status = "notExist"
    res.json(obj);
}});

module.exports = router;
