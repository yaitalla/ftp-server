const express = require('express');
const router = express.Router();
const user = require('./userRoute');
const ftp = require('./ftpRoute');
const checkToken = require('../../controllers/authCtrl');

router.use('/ftp', ftp);
router.use('/user', user);

module.exports = router;
