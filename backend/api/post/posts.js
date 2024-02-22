const express = require("express");
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const parseCookies  = require('../../components/stuff/cookieReader.js')

const posts = require('../../components/mongoDB/posts.js')

router.get("/posts/:username", async (req, res) => {
    try{
    let username = req.params.username; 
    let data = await posts(username)

    let obj = {}

    obj.posts = data.posts
    obj.count = (data.posts).length
    res.json(obj);
}catch(e){
    let obj = {}
    obj.status = "notExist"
    res.json(obj);
}});

router.post("/posts/create", async (req, res) => {
    const cookie = parseCookies(req.headers.cookie);
    const DBuserData = await userData(cookie.token);

    if(DBuserData){
        const data = req.body;
        console.log(data)
    }
        
});

module.exports = router;
