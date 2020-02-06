const mongoose = require('mongoose');
const { PASSWORD_HASH_KEY: secret } = process.env;
const crypto = require('crypto');

// 사용법: console.log(hash('1234'));
const hash = (password) => crypto.createHmac('sha256', secret).update(password).digest('hex');

const User = new mongoose.Schema({
  displayName: String,
  email: String,
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  metaInfo: {
    activated: Boolean,
    default: false
  }
});

User.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

User.statics.localRegister = function({ displayName, email, password }) {
  const user = new this({
    displayName,
    email,
    password: hash(password)
  });
  user.save();
  return user;
};

module.exports = mongoose.model('User', User);