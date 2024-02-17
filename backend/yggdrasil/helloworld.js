const express = require("express");
router = express.Router();

router.get("/helloworld", async (req, res) => {
    res.json('hello World piko server')
});

module.exports = router;
