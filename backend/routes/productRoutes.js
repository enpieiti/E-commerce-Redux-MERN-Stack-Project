const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getBestSellerProduct,
  getNewArrivals,
  getSimilarProducts,
  getProductById,
} = require("../controllers/productController");

// Auth Routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct); // Get User Profile
router.get("/", getProducts);
router.get("/best-seller", getBestSellerProduct);
router.get("/new-arrivals", getNewArrivals);
router.get("/similar/:id", getSimilarProducts);
router.get("/:id", getProductById);

module.exports = router;
