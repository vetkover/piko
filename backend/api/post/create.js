const express = require("express");
router = express.Router();

const userData = require('../../components/mongoDB/userData.js')
const parseCookies  = require('../../components/stuff/cookieReader.js')
const moveTempFile = require('../../yggdrasil/sending/cdn/moveTempFile.js')
const createPost = require('../../components/mongoDB/createPost.js')

router.post("/create", async (req, res) => {
    const cookie = parseCookies(req.headers.cookie);
    const DBuserData = await userData(cookie.token);
    const data = req.body;
    const postIsNotEmpty = data.images.length || data.sounds.length || data.video || data.text.trim().length;
    if(DBuserData && postIsNotEmpty){

        if (data.images && data.images.length) {
            data.images.forEach(imageToken => {
                const dataObject ={
                    username: DBuserData.username,
                    tempToken: imageToken
                }
                moveTempFile(dataObject);
            });
          }
        
          if (data.sounds && data.sounds.length) {
            data.sounds.forEach(sound => {
                const dataObject ={
                    username: DBuserData.username,
                    tempToken: sound.src
                }
                moveTempFile(dataObject);
            });
          }
        
          if (data.video) {
            const dataObject ={
                username: DBuserData.username,
                tempToken: data.video
            }
            moveTempFile(dataObject);
          }

        
        console.log(data)
        const newPostObj = {
            username: DBuserData.username,
            text: data.text, 
            date: Date.now(), 
            images: data.images,
            sounds: data.sounds,
            video: data.video
        }
        createPost(newPostObj)
        res.json(true)
    }
        
});

module.exports = router;