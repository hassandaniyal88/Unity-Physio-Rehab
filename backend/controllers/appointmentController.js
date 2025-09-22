const Appointment = require("../models/Appointment");

const Doctor = require("../models/Doctor");

exports.createAppointment = async (req, res) => {
  const { doctorId, type, date, time, notes } = req.body;
  try {
    if (!type || !["home", "clinic", "online"].includes(type)) {
      return res.status(400).json({ message: "Invalid appointment type" });
    }

    const doctorProfile = await Doctor.findOne({ user: doctorId });
    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }
    const computedFee = type === "home" ? doctorProfile.fees.home : type === "clinic" ? doctorProfile.fees.clinic : doctorProfile.fees.online;

    const appointment = new Appointment({
      user: req.user.id,
      doctor: doctorId,
      type,
      fee: computedFee,
      date,
      time,
      notes,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const filter = req.user.role === "doctor" ? { doctor: req.user._id } : { user: req.user.id };
    const appointments = await Appointment.find(filter).populate("doctor", "name").populate("user", "name");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Failed to update appointment" });
  }
};
