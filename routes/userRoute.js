const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/', getAllUsers);
router.get('/test', userCtrl.test);

function getAllUsers(req, res, next){
  res.json(userCtrl.details());
}

module.exports = router;
