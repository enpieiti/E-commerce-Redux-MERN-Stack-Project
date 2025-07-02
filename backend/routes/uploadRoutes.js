// routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadImageController");

const router = express.Router();

// Multer config: dùng memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route POST /api/upload/image
// @desc Upload image to Cloudinary
// @access Public
router.post("/image", upload.single("image"), uploadImage);

module.exports = router;
