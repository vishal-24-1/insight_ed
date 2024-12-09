const express = require('express');
const { uploadFiles } = require('../controllers/uploadController');
const fileUpload = require('../middleware/fileUpload');

const router = express.Router();

// POST route for file uploads and processing
router.post('/', fileUpload.array('files', 3), uploadFiles);

module.exports = router;
