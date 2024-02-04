const express = require("express");
const parseCookies  = require('../../components/stuff/cookieReader.js')
router = express.Router();

const p = require('../../components/mongoDB/p.js')

router.get("/p/:username", async (req, res) => {
    try{
    let username = req.params.username; 
    let data = await p(username)

    let obj = {}

    obj.status = "ok"
    obj.username = data.username
    obj.nickname = data.nickname
    obj.avatar = data.avatar
    obj.bio = data.bio
    obj.baner = data.baner

    res.json(obj);
}catch(e){
    let obj = {}
    obj.status = "notExist"
    res.json(obj);
}});

module.exports = router;
