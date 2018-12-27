const express = require('express');
const router = express.Router();
const ftpCtrl = require('../../controllers/ftpCtrl');
const checkToken = require('../../controllers/authCtrl');


router.post('/upload', checkToken, ftpCtrl.upload);
router.get('/getUploadedFiles', checkToken, ftpCtrl.getFiles)
router.get('/download', ftpCtrl.download);


module.exports = router;
