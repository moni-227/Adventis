const express = require('express');
const router = express.Router();
const userController = require('../controller/projects');

router.post('/Project', userController.assetDetails);
router.get('/Project', userController.assetDetailsget);
router.put('/Projectupdate/:id',userController.projectDetailsupdate);
router.delete('/Projectdelete/:id',userController.projectDetailsdelete)

module.exports = router;
