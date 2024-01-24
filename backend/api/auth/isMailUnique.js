const express = require("express");
router = express.Router();
const ismailunique = require('../../components/mongoDB/ismailunique')

router.post("/ismailunique", async (req, res) => {
    res.json({ "message": await ismailunique(req.body.email)})
});

module.exports = router;
