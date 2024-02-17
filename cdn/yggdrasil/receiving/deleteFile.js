const express = require("express");
const deleteFile = require('../../components/mongoDB/deleteFile.js')
router = express.Router();

router.post("/deletefile", async (req, res) => {
    if(deleteFile(req.body.name)){
        res.json(true)
    } else {
    res.json(false)
    }
});

module.exports = router;
