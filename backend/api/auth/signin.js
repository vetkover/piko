const express = require("express");
router = express.Router();

const tokenGenerate = require('../../components/stuff/tokenGen')

const isusernameunique = require('../../components/mongoDB/isusernameunique')
const ismailunique = require('../../components/mongoDB/ismailunique')
const isnicknameunique = require('../../components/mongoDB/isnicknameunique')
const signIn = require('../../components/mongoDB/signin')

router.post("/signin", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const nickname = req.body.nickname;
    const password = req.body.password;

    if(await isusernameunique(username) && await ismailunique(email) && await isnicknameunique(nickname)){
        const result = await signIn(username, nickname, password, email);
        if(await result){
            
            const token = await tokenGenerate.module.tokenGenerate(nickname)
            
            res.json({
            message: true,
            token: token
         }) 
        } else { 
          res.json({
            message: false
         })
        }
    } else {
        res.json({
            message: false
         });
    }


});

module.exports = router;
