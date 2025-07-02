const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/adminUserController");
const router = express.Router();

router.get("/", protect, admin, getUsers);
router.post("/", protect, admin, createUser);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
