// const multer = require('multer');
// const path = require('path');

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename by appending the current timestamp and the original file extension
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// // Initialize Multer with the storage configuration
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Set a file size limit (in this example, 5MB)
//   },
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// // Function to check file types
// function checkFileType(file, cb) {
//   // Allowed file extensions
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check the file extension
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check the MIME type
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images only!');
//   }
// }

// module.exports = upload;








// upload.js

const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by appending the current timestamp and the original file extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Initialize Multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Set a file size limit (in this example, 5MB)
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Function to check file types
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

module.exports = upload;
