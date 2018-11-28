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

 const register =  (req, res) => {
     let user = new User(
       {
         email: req.body.email,
         hashpass: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
       }
     );
     user.save((err) => {
       if (err) {
         res.send(err);
       } else {
         res.send('User created successfully');
       }
     })
/*
     const obj  = details();
     for (key in obj)
     console.log(obj[key])
     res.send('Email already taken')
*/
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
      getEmails(res, req.body.email)
      return(res);
      db.close();
    });
  });
}


module.exports = {
  register,
  test,
  details
};
