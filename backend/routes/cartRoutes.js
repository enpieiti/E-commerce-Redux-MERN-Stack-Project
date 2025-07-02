const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addToCart, updateCart, deleteItem, getCart, mergeCart } = require("../controllers/cartController");

// Auth Routes
router.post("/", addToCart);
router.put("/", updateCart);
router.delete("/", deleteItem);
router.get("/", getCart);
router.post("/merge", protect, mergeCart);

module.exports = router;
