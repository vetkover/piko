const express = require("express");
const moveTempFile = require('../../components/mongoDB/moveTempFile.js')
router = express.Router();

router.post("/movetempfile", async (req, res) => {
    if(moveTempFile(req.body.tempToken)){
        res.json(true)
    } else {
    res.json(false)
    }
});

module.exports = router;
