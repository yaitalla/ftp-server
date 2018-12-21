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
  console.log(req.body);
  return res.status(404).json({
    message: req.body
  });
/*  if (isEmpty(req.files)) {
    return res.status(500).json({
      message: 'no file'
    });
  } else {
    const srcName = Object.getOwnPropertyNames(req.files)[0];
    fs.writeFile(__dirname+'/../uploadedFiles/'+req.files[srcName].name,
                  req.files[srcName].data, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          message: err
        });
      }
      return res.status(200).json({
        success: true,
        message: "File uploaded successfully"
      });
    });
  }*/
};

const getFiles = (req, res) => {
  fs.readdir(__dirname+'/../uploadedFiles', (err, files) => {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }
    if (isEmpty(files)) {
      console.log('folder is empty');
    } else {
      console.log(files)
      res.status(200).json(({
        message: files
      }));
    }
  });
}

/*
const download = (req, res) => {
  res.download('../')
}
*/

module.exports = {
  upload,
  getFiles
}
