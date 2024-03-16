const express = require("express");
const router = express.Router();

const posts = require('../../components/mongoDB/posts.js');

router.get("/posts/:username", async (req, res) => {
    try {
        let username = req.params.username; 
        let data = await posts(username);
        let activePosts = data.posts.filter(post => post.status === 'active');

        let obj = {
            owner: username,
            posts: activePosts,
            count: activePosts.length
        };
        res.json(obj);
    } catch(e) {
        res.json({ status: "notExist" });
    }
});

module.exports = router;
