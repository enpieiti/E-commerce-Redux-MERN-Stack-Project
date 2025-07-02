const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createCheckout, markAsPaid, finalizeCheckout } = require("../controllers/checkoutController");

router.post("/", protect, createCheckout);
router.put("/:id/pay", protect, markAsPaid);
router.post("/:id/finalize", protect, finalizeCheckout);

module.exports = router;
