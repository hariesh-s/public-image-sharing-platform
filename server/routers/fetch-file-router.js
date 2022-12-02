const express = require('express');
const router = express.Router();
const { fetchFile } = require('../controllers/fetch-file-controller');

router.get("/api/home/:name", fetchFile)
module.exports = router;