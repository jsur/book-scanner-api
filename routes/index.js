const express = require('express');
const router = express.Router();

const googleVision = require('./google-vision');

router.use('/google-vision', googleVision);

module.exports = router;