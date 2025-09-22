const Doctor = require("../models/Doctor");
const User = require("../models/User");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { specialization, yearsOfExperience, location, fees, bio, availability } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can manage profiles" });
    }

    const update = { user: userId, specialization, yearsOfExperience, location, fees, bio, availability };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const profile = await Doctor.findOneAndUpdate({ user: userId }, update, options).populate("user", "name email");
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to save doctor profile" });
  }
};

exports.getDoctorsPublic = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "name email");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("user", "name email");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch doctor" });
  }
};


