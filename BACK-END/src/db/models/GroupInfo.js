const mongoose = require('mongoose');
const { PASSWORD_HASH_KEY: secret } = process.env;
const crypto = require('crypto');
const token = require('lib/token');

// 사용법: console.log(hash('1234'));
const hash = (password) => crypto.createHmac('sha256', secret).update(password).digest('hex');

const GroupInfo = new mongoose.Schema({
  type: String,
  name: String,
  tell: String,
  location: String,
  description: String,
  certification: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  users: [ // Group에 속해있는 User들
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  drivers: [ // Group에 속해있는 User들
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// 이름과 위치로 그룹 검색하기.
GroupInfo.statics.findExistancy = function({ name, location }) {
  return this.findOne({
    $or: [
      { name },
      { location }
    ]
  });
};

// group 회원가입
GroupInfo.statics.groupRegister = function({ type, name, tell, location, description, certification }) {
  const group = new this({
    type,
    name,
    tell,
    location,
    description,
    certification
  });
  group.save();
  return group;
}; 

GroupInfo.statics.updateManagers = async function({ _id, users, drivers }) {
  return this.update({ _id }, { $set: { users, drivers } });
};

// methods
GroupInfo.methods.memeberValidation = function({ _id }) {
  let result = {
    role: '',
    userId: '',
    groupInfoId: this._id
  };
  const userCheck = this.users.filter(userId => userId === _id);
  const driverCheck = this.drivers.filter(userId => userId === _id);

  if(userCheck) {
    return {
      ...result,
      role: 'user',
      userId: _id
    };
  }else if(driverCheck) {
    return {
      ...result,
      role: 'driver',
      userId: _id
    };
  } else {
    return null;
  }
};
module.exports = mongoose.model('GroupInfo', GroupInfo);