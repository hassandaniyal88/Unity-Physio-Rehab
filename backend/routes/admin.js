const express = require("express");
const router = express.Router();
const { listUsers, listAppointments, listDoctors, deleteUser } = require("../controllers/adminController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authMiddleware, authorizeRoles("admin"));

router.get("/users", listUsers);
router.get("/appointments", listAppointments);
router.get("/doctors", listDoctors);
router.delete("/users/:id", deleteUser);

module.exports = router;


