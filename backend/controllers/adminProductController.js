const Product = require("../models/Product");

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { getProducts };
