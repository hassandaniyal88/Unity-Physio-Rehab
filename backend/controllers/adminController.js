const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

exports.listUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.listAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate("user", "name").populate("doctor", "name");
  res.json(appointments);
};

exports.listDoctors = async (req, res) => {
  const doctors = await Doctor.find().populate("user", "name email");
  res.json(doctors);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};


