const express = require("express");
const router = express.Router();
const { createAppointment, getAppointments, updateAppointmentStatus } = require("../controllers/appointmentController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, authorizeRoles("patient"), createAppointment);
router.get("/", authMiddleware, getAppointments);
router.patch("/:id/status", authMiddleware, authorizeRoles("doctor", "admin"), updateAppointmentStatus);

module.exports = router;
