const express = require('express');
const { handleLogin } = require('../controllers/login-controller');
const router = express.Router();

router.post("/api/login", handleLogin)
module.exports = router;
