const express = require("express");
router = express.Router();

const tokenGenerate = require('../../components/stuff/tokenGen')

const login = require('../../components/mongoDB/login')

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;


        const result = await login(username, password);
        if(await result){
            
            const token = await tokenGenerate.module.tokenGenerate(username)
            
            res.json({
            message: true,
            token: token
         }) 
        } else { 
          res.json({
            message: false
         })
        }

    }
);

module.exports = router;
