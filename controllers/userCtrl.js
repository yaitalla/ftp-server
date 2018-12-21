const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conf = require('../config/db');

const getEmails = (obj, email) => {
  for (key in obj) {
    if (obj[key].email === email) {
      console.log(obj[key].email)
      return true;
    }
    return false;
  }
}

const login = (req, res) => {

  User.find({ email: req.body.email }).then(
    result => {
      if (!result || result.length === 0) {
        res.status(500).json({
          message: 'login does not exist'
        })
      } else {
        const hash = result[0].hashpass;
        if (bcrypt.compareSync(req.body.password, hash)){
          console.log(result[0].token)
          res.status(200).send({
            token: result[0].token
          })
        } else {
          res.status(500).send({
            message: 'invalid password'
          })
        }
      }
  }).catch(err => console.log('yasErr', err));
}

 const register =  (req, res) => {

     let user = new User(
       {
         email: req.body.email,
         hashpass: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
       }
     );
     const JWToken = jwt.sign(
       {
         email: user.email,
         _id: user._id
       },
         conf.secret,
       {
         expiresIn: '2h'
       });
      user.token = JWToken;
     User.find({ email: req.body.email }).then(
       result => {
         if (!result || result.length === 0) {
           user.save((err) => {
             if (err) {
               res.send(err);
             } else {
               console.log(JWToken)
               return res.status(200).send({
                 token: JWToken
               });
             }
           });

         } else {
           res.send('email already taken');
         }
       }
     ).catch(err => console.log('USR_CTRL', err));
};

const test = (req, res) => {
  res.send('test controller');
};

const details = (req, res, next) => {
  User.findById(req.userId, { hashpass: 0 }, (err, user) => {
    if (err) {
      return res.status(500).send("Problem while finding user");
    }
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  });
};

const middleware = (user, req, res, next) => {
  res.status(200).send(user);
};

module.exports = {
  register,
  test,
  middleware,
  details,
  login
};
