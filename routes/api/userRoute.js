const express = require('express');
const router = express.Router();
const userCtrl = require('../../controllers/userCtrl');
const checkToken = require('../../controllers/authCtrl');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/details', userCtrl.details);
router.get('/test', userCtrl.test);
//router.use(userCtrl.middleware);



module.exports = router;
