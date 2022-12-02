const express = require('express');
const { handleRegistration } = require('../controllers/register-controller');
const router = express.Router();

router.post("/api/register", handleRegistration)
module.exports = router;
