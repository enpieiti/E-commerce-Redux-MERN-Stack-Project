const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getUserOrders, getOrderById } = require("../controllers/orderController");

router.get("/my-orders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;
