const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic required env checks
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in environment variables");
  process.exit(1);
}
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  console.warn("Warning: JWT secrets not set. Authentication may fail.");
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("❌ No MongoDB URI found. Please set MONGO_URI or MONGODB_URI in .env");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  });

// Health check
app.get("/health", (req, res) => res.send({ status: "ok" }));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.info(`Received ${signal}. Closing server...`);
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.info("Mongo connection closed. Exiting.");
      process.exit(0);
    });
  });
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

module.exports = app; // for testing
