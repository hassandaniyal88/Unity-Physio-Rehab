const express = require("express");
const router = express.Router();
const { createOrUpdateProfile, getDoctorsPublic, getDoctorById } = require("../controllers/doctorController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

// Public
router.get("/", getDoctorsPublic);
router.get("/:id", getDoctorById);

// Doctor only
router.post("/me/profile", authMiddleware, authorizeRoles("doctor"), createOrUpdateProfile);

module.exports = router;


