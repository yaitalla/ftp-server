const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const mongo = require('mongoose');
const url = require('../config/db');

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
  let user = new User(
    {
      email: req.body.email,
      hashpass: req.body.password
    }
  );
  User.find({ email: req.body.email }).then(
    result => {
      if (!result || result.length === 0) {
        res.send("Email does not exist in database")
      }
      const hash = result[0].hashpass;
    //  console.log(hash);
    //  console.log(user.hashpass)
      if (bcrypt.compareSync(user.hashpass, hash)){
        res.send('logged in')
      }
      res.send('invalid password')
  });
}

 const register =  (req, res) => {
     let user = new User(
       {
         email: req.body.email,
         hashpass: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
       }
     );
     User.find({ email: req.body.email }).then(
       result => {
         if (!result || result.length === 0) {
           user.save((err) => {
             if (err) {
               res.send(err);
             } else {
               res.send('User created successfully');
             }
           })
         } else {
           res.send('email already taken');
         }
       }
     );
};

const test = (req, res) => {
  res.send('test controller');
};

const details = (req, res) => {
  mongo.connect(url.url, { useNewUrlParser: true}, (err, db) => {
    if (err) throw err;
    db.collection("users").find({}, { projection: { _id: 0, email: 1}
    }).toArray((err, res) => {
      if (err) throw err;
      return(res);
      db.close();
    });
  });
}


module.exports = {
  register,
  test,
  details,
  login
};
