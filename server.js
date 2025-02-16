require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
const limiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
require("./config/passport"); // Load passport config

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter); // Apply rate limiting
app.use(passport.initialize());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Authentication routes
app.use("/api/auth", authRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Home route  (Test endpoint)  - Uncomment to test the API
// app.get("/", (req, res) => {
//   res.send("Authentication API is running...");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
