const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { getProducts } = require("../controllers/adminProductController");
const router = express.Router();

router.get("/", protect, admin, getProducts);

module.exports = router;
