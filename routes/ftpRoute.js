const express = require('express');
const router = express.Router();
const ftpCtrl = require('../controllers/ftpCtrl');


router.post('/upload', ftpCtrl.upload);
//router.post('/dowload', ftpCtrl.download);


module.exports = router;
