// const express = require('express');
// const router = express.Router();
// const userController = require('../controller/Registration');

// router.post('/Register',userController.RegisterDetails);

// router.post('/Login',userController.LoginDetails);
// router.post('/Forgotpassword',userController.forgotPassword);
// router.get('/Login', userController.LoginDetailsget);
// router.put('/userupdate/:id',userController.userDetailsupdate);

// router.delete('/userdelete/:id',userController.userDetailsdelete)

// module.exports = router;





const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controller/Registration');


// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });

router.post('/Register', userController.RegisterDetails);
router.post('/Login', userController.LoginDetails);
// router.post('/Register', upload1.single('profilePicture'), userController.RegisterDetails);
router.post('/Forgotpassword', userController.forgotPassword);
router.get('/Login', userController.LoginDetailsget);

// Use multer middleware to handle file uploads in the userupdate route
router.put('/userupdate/:id', upload.single('profilePicture'), userController.userDetailsupdate);
// router.put('/userupdate/:id', upload.single('profilePicture'), userController.userDetailsUpdate);





router.delete('/userdelete/:id', userController.userDetailsdelete);

module.exports = router;
