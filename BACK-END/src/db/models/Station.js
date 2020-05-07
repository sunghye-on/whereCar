const mongoose = require("mongoose");

const Station = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  name: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: [Number],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Station.statics.registerStations = function ({ stations, courseId }) {
  let station = [];
  try {
    stations.map((obj) => {
      const location = {
        type: "Point",
        coordinates: [obj.longitude, obj.latitude],
      };
      newStation = new this({
        name: obj.stationName,
        courseId,
        location,
      });
      station.push(newStation);
      newStation.save();
    });
  } catch (error) {
    console.log(`❌ DB Create Error::: ${error}`);
  }
  return station.length !== 0 ? station : null;
};

module.exports = mongoose.model("Station", Station);
