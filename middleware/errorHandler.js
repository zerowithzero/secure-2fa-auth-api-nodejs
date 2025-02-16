// 📌 How this works:

// Logs errors using Winston.
// Returns a JSON error response.
// Hides error stack in production for security.

const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message); // Log error

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;
