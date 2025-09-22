const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["home", "clinic", "online"], required: true },
    fee: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    notes: { type: String },
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
