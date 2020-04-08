const mongoose = require('mongoose');

const CarInfo = new mongoose.Schema({
  carName: String,
  carNumber: String,
  seatNumber: String,
  inspectionDate: Date,
  carImageUrl: String,
  group: { // 해당 Admin이 속해있는 AdminGroup정보
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupInfo'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// car register 회원가입
CarInfo.statics.carRegister = function({ carName, carNumber, seatNumber, inspectionDate, carImageUrl, group }) {
  const carInfo = new this({
    carName,
    carNumber,
    seatNumber,
    inspectionDate,
    carImageUrl,
    group
  });
  carInfo.save();
  return carInfo;
}; 

module.exports = mongoose.model('CarInfo', CarInfo);