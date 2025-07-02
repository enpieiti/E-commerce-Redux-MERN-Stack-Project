const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectBD = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

// CONNECT TO MONGOODB
connectBD();

app.get("/", (rep, res) => {
  res.send("WELCOME TO ETITI API!");
});

// Routes
app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/upload", uploadRoutes);

// Routes admin
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
