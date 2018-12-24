const jwt = require('jsonwebtoken');
const conf = require('../config/db')


const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    console.log('no token no access')
    return res.status(401).json({
      auth: false,
      message: "no token no access"
    });
  } else {
    jwt.verify(token, conf.secret, (err, decoded) => {
      if (err) {
        console.log(token)
        return res.status(401).send("jwt.verify failed");
      } else {
        req.userId = decoded._id;
        next();
      }
    });
  }

};

module.exports = checkToken;
