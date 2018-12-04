const fs = require('fs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const upload = (req, res) => {
  console.log(req.headers);
  if (isEmpty(req.files)) {
    console.log('no file');
    res.redirect('/');
  } else {
    const srcName = Object.getOwnPropertyNames(req.files)[0];
    fs.writeFile(__dirname+'/../uploadedFiles/'+req.files[srcName].name,
                  req.files[srcName].data, (err) => {
      if (err) {
        return res.status(500).json({
          message: err
        });
      }
      return res.status(200).json({
        success: true,
        message: "File uploaded successfully"
      });
    });
  }
};

/*
const download = (req, res) => {
  res.download('../')
}
*/

module.exports = {
  upload
}
