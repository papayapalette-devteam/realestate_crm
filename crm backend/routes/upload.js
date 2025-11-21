const express = require("express");
const router = express.Router();
const upload=require('../middlewares/file');
const { uploadToCloudinary } = require("../controllers/Upload Files/upload");




router.post("/upload-files",upload.any("files"),  uploadToCloudinary);





module.exports = router;
