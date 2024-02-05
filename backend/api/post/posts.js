const express = require("express");
router = express.Router();

const posts = require('../../components/mongoDB/posts.js')

router.get("/posts/:username", async (req, res) => {
    try{
    let username = req.params.username; 
    let data = await posts(username)

    let obj = {}

    obj.posts = data.posts

    res.json(obj);
}catch(e){
    let obj = {}
    obj.status = "notExist"
    res.json(obj);
}});

module.exports = router;