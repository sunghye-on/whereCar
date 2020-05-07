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

module.exports = mongoose.model("DriverLog", DriverLog);
