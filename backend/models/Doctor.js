const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    specialization: { type: String, required: true },
    yearsOfExperience: { type: Number, default: 0 },
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      lat: { type: Number },
      lng: { type: Number }
    },
    fees: {
      home: { type: Number, required: true },
      clinic: { type: Number, required: true },
      online: { type: Number, required: true }
    },
    bio: { type: String },
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    availability: [
      {
        dayOfWeek: { type: Number, min: 0, max: 6 },
        startTime: { type: String },
        endTime: { type: String }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);


