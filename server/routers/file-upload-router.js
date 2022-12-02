const express = require('express');
const router = express.Router();
const { handleFileUpload } = require('../controllers/file-upload-controller');

router.post("/api/file-upload", handleFileUpload)
module.exports = router;