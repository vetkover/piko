const express = require("express");
router = express.Router();
const isnicknameunique = require('../../components/mongoDB/isnicknameunique')

router.post("/isnicknameunique", async (req, res) => {
    res.json({ "message": await isnicknameunique(req.body.nickname)})
});

module.exports = router;
