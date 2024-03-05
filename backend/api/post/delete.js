const express = require("express");
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const parseCookies  = require('../../components/stuff/cookieReader.js')
const checkPostOwner = require('../../components/mongoDB/checkPostOwner.js')
const deletePost = require('../../components/mongoDB/deletePost.js')
router.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const cookie = parseCookies(req.headers.cookie);
    const DBuserData = await userData(cookie.token);
    if (await checkPostOwner(DBuserData.username, id)){
        deletePost(Number(id))
        res.json({"status": true})
    } else {
        res.json({
            "status": false,
            "message": "you are not the owner of the post"
        })
    }
        
});

module.exports = router;