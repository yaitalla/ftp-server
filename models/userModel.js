const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashpass: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    default: ""
  },
  uploads: {
    type: Number,
    default: 0
  },
  dowloads: {
    type: Number,
    default: 0
  },
  data: {
    type: String,
    default: ""
  }
});

userSchema.methods.passwordHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.passwordCheck = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
