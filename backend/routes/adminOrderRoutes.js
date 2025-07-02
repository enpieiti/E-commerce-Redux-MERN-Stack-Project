const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { getOrders, updateOrder, deleteOrder } = require("../controllers/adminOrderController");
const router = express.Router();

router.get("/", protect, admin, getOrders);
router.put("/:id", protect, admin, updateOrder);
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
