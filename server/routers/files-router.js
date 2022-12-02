const express = require('express');
const router = express.Router();
const { getAllFiles } = require('../controllers/files-controller');

router.get("/api/files", getAllFiles)
module.exports = router;