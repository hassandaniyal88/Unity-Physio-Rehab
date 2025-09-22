const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviewController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/doctor/:doctorId", ctrl.listForDoctor);
router.post("/", authMiddleware, authorizeRoles("patient"), ctrl.create);

module.exports = router;


