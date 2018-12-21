const jwt = require('jsonwebtoken');
const conf = require('../config/db')


const checkToken = (req, res, next) => {
  console.log(req.headers)
  const referer = req.headers.referer.substr(req.headers.referer.length - 6);
  console.log({referer})
  const token = req.headers['x-access-token'];
  if (!token && referer !== 'signup' && referer !== '/login') {
    return res.status(403).json({
      auth: false,
      message: "no token no access"
    });
  } else if (referer !== 'signup' && referer !== '/login') {
    jwt.verify(token, conf.secret, (err, decoded) => {
      if (err) {
        console.log('tokene', token)
        return res.status(500).send("jwt.verify failed");
      } else {
        req.userId = decoded._id;
        next();
      }
    });
  }
next();
};

module.exports = checkToken;
