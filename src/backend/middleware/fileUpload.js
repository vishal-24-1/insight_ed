const multer = require('multer');
const path = require('path');

// Configure Storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const cleanFilename = file.originalname.replace(/\s+/g, '_'); // Replace spaces with underscores
    cb(null, `${timestamp}_${cleanFilename}`);
  },
});

// Configure File Filtering
const fileFilter = (req, file, cb) => {
  // Allow only PDF files
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed.'));
  }
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("Saving file to uploads/ directory...");
      cb(null, 'uploads/'); // Directory to save files
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const cleanFilename = file.originalname.replace(/\s+/g, '_');
      cb(null, `${timestamp}_${cleanFilename}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});


module.exports = fileUpload;
