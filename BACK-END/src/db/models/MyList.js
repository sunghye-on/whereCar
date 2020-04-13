const mongoose = require('mongoose');

const MyList = new mongoose.Schema({
  user: { // 해당 리스트를 사용하는 User
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  groupList: [{
    group: { // 해당 Admin이 속해있는 AdminGroup정보
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GroupInfo'
    },
    courses: []
  }], 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// car register 회원가입
// MyList.statics.courseRegister = function({ courseName, stations, group }) {
//   const course = new this({
//     courseName,
//     stations,
//     group
//   });
//   course.save();
//   return course;
// }; 

// MyList.statics.carUpdateById = async function({ _id, courseName, stations }) {
//   return this.update({ _id }, { courseName, stations });
// };

// MyList.statics.removeById = function({ _id }) {
//   return this.remove({ _id });
// };

module.exports = mongoose.model('MyList', MyList);