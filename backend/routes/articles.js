const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/articleController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

// Public
router.get("/", ctrl.listPublic);
router.get("/:id", ctrl.getById);

// Admin
router.post("/", authMiddleware, authorizeRoles("admin"), ctrl.create);
router.put("/:id", authMiddleware, authorizeRoles("admin"), ctrl.update);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), ctrl.remove);

module.exports = router;


