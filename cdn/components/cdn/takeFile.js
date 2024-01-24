const path = require("path");
const express = require("express");
router = express.Router();

const findFile = require("../mongoDB/findFile")

router.get("/:fileID(*)", async (req, res) => {
    const fileID = req.params.fileID;
    const toMain = path.dirname(process.mainModule.filename)
    const fileDB = await findFile(fileID)

    try{
    res.download(path.resolve(toMain,"root", fileDB?.path))
    } catch(e){
        res.json({message: e})
    }
});

module.exports = router;