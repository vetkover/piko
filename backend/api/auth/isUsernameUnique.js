const express = require("express");
router = express.Router();
const isusernameunique = require('../../components/mongoDB/isusernameunique')

router.post("/isusernameunique", async (req, res) => {
    res.json({ "message": await isusernameunique(req.body.username)})
});

module.exports = router;
