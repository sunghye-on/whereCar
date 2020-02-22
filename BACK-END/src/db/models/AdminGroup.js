const mongoose = require('mongoose');
const { PASSWORD_HASH_KEY: secret } = process.env;
const crypto = require('crypto');
const token = require('lib/token');

// 사용법: console.log(hash('1234'));
const hash = (password) => crypto.createHmac('sha256', secret).update(password).digest('hex');

const AdminGroup = new mongoose.Schema({
  groupName: String,
  tell: String,
  groupAddress: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  users: [ // Group에 속해있는 User들
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ] 
});

module.exports = mongoose.model('AdminGroup', AdminGroup);