const mongoose = require('mongoose');

const CarInfo = new mongoose.Schema({
  carName: String,
  carNumber: String,
  seatNumber: String,
  inspectionDate: Date,
  carImageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// car register 회원가입
CarInfo.statics.carRegister = function({ carName, carNumber, seatNumber, inspectionDate, carImageUrl }) {
  const carInfo = new this({
    carName,
    carNumber,
    seatNumber,
    inspectionDate,
    carImageUrl
  });
  carInfo.save();
  return carInfo;
}; 

module.exports = mongoose.model('CarInfo', CarInfo);