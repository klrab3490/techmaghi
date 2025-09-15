const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // load .env

const app = express();
const port = process.env.PORT || 2000;

// Middleware
app.use(express.json());        // parse JSON bodies
app.use(cors());                // enable CORS for all origins

// Optional: Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Basic route for testing
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

// Check MongoDB URL
if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL is missing in .env");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Routers
const userRouter = require('./routes/user');
app.use('/users', userRouter);

const blogRouter = require('./routes/blog');
app.use('/blogs', blogRouter);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server (skip in test mode)
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
}

module.exports = app;
