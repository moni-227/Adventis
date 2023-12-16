const express = require('express');
const router = express.Router();
const userController = require('../controller/Userproject');

router.post('/UserProject', userController.assetDetails);
router.get('/UserProject', userController.assetDetailsget);
router.put('/UserProjectupdate/:id',userController.userprojectupdate);
router.delete('/UserProjectdelete/:id',userController.userprojectdelete)


module.exports = router;
