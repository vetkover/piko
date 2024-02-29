const path = require("path");
const express = require("express");
const multer  = require('multer');
const randomString = require('../stuff/randomString')
const tempUpload = require("../mongoDB/temp")
router = express.Router();

const ruleSet = {
    avatar: {
        fileSize: 1024 * 1024 * 5,
        type: ['image/png', 'image/jpeg']
    },
    baner: {
        fileSize: 1024 * 1024 * 5,
        type: ['image/png', 'image/jpeg']
    },
    media: {
      fileSize: 1024 * 1024 * 500,
      type: ['image/png', 'image/jpeg', 'image/jpg', 'audio/mpeg', 'video/mp4']
  }
}

router.post('/temp/:type', async (req, res) => {
  const contentType = req.params.type;
  const rule = ruleSet[contentType];

    if (!rule) {
        return res.status(400).json({message: "wrong type", status: false});
    }

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, './root/temp')
        },
        filename: async function(req, file, cb) {
          const extension = (file.originalname).split(".").pop();
          const newFileName =  `${await randomString()}.${extension}`;
          cb(null, newFileName)
        }
      });

    const upload = multer({ 
      storage: storage,
      limits: {
        fileSize: rule.fileSize
      },
      fileFilter: (req, file, cb) => {
        if (rule.type.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      }
    }).single('file');
  
    upload(req, res, function(err) {
      if (err) {
        console.error(err);
        res.status(500).json({status: false});
      } else {

        console.log(req.file)
        const fileObject = {
            originalName: req.file.originalname,
            name: req.file.filename.split('.')[0],
            path: `temp/${req.file.filename}`,
            tempType: contentType
        }

        tempUpload(fileObject)
        res.json({
            status: true,
            originalName: fileObject.originalName,
            tempToken: fileObject.name
        });
      }
    });
});
  

module.exports = router;

