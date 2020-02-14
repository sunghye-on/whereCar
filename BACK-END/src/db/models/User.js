const mongoose = require('mongoose');
const { PASSWORD_HASH_KEY: secret } = process.env;
const crypto = require('crypto');
const token = require('lib/token');

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

// 이메일 찾기
User.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// 닉네임 찾기
User.statics.findByDisplayName = function(displayName) {
  return this.findOne({ displayName });
};

// 이메일과 닉네임 찾기
User.statics.findExistancy = function({ email, displayName }) {
  return this.findOne({
    $or: [
      { email },
      { displayName }
    ]
  });
};

// local 회원가입
User.statics.localRegister = function({ displayName, email, password }) {
  const user = new this({
    displayName,
    email,
    password: hash(password)
  });
  user.save();
  return user;
}; 

User.methods.generateToken = function() {
  const { _id, displayName, email } = this;
  return token.generateToken({
    user: {
      _id,
      displayName,
      email
    }
  }, 'user');
};

User.statics.updateUser = async function({ displayName, password, email }) {
  return this.update({ email }, { displayName, password: hash(password) });
};

// 해당 유저의 비밀번호 일치여부 체크
User.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
};

module.exports = mongoose.model('User', User);