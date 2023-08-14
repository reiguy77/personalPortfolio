const express = require("express");
let multer = require('multer');
const router = express.Router();
const fileController = require("../controllers/file.controller");
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
// const upload = multer();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let destination = path.join(__dirname,'../assets/');
        if(req.body.subfolder){
            destination = path.join(destination, '/'+req.body.subfolder);
        }
        checkDirectoryExists(destination);
      cb(null, destination); // Set the upload directory here
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const originalname = `${uuid.v4()}${ext}`;
      cb(null, originalname); 
    },
  });
  const fileSizeLimit = 100 * 1024 * 1024; // 5 MB

  const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: fileSizeLimit,
      }, 
    });


router.post("/", upload.array('files'), fileController.addFiles);
router.post("/addImages", fileController.addImages);
router.post("/clearImages", fileController.clearImages)
router.post("/fileNames/", fileController.retrieveFileNames);
router.post("/retrieveFile/", fileController.retrieveFile);
// router.post("/retrieveImages/", fileController.retrieveImages);
router.post("/clearImageCategories", fileController.clearImageCategories)
router.post("/retrieveCategoryNames", fileController.retrieveCategoryNames);
router.post("/clearSubfolder", fileController.clearSubfolder);
module.exports = router;

function checkDirectoryExists(directory){
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive:true});
      }
}