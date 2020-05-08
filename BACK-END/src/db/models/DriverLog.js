const mongoose = require("mongoose");

const DriverLog = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

DriverLog.statics.driverLogRegister = function ({ driverId, name, location }) {
  const driverLog = new this({
    driverId,
    name,
    location,
  });
  driverLog.save();
  return driverLog;
};

module.exports = mongoose.model("DriverLog", DriverLog);
