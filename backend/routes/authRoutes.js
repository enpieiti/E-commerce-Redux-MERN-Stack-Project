const express = require("express");
const router = express.Router();
const { loginUser, getUserProfile, registerUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Auth Routes
router.post("/register", registerUser); // Register User
router.post("/login", loginUser); // Login User
router.get("/profile", protect, getUserProfile); // Get User Profile

module.exports = router;
