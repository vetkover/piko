const express = require("express");
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const parseCookies  = require('../../components/stuff/cookieReader.js')

const createPost = require('../../components/mongoDB/createPost.js')

router.post("/create", async (req, res) => {
    const cookie = parseCookies(req.headers.cookie);
    const DBuserData = await userData(cookie.token);

    if(DBuserData){
        const data = req.body;
        const newPostObj = {
            username: DBuserData.username,
            text: data.text, 
            date: Date.now(), 
            images: data.images, 
        }
        createPost(newPostObj)
        res.json(true)
    }
        
});

module.exports = router;