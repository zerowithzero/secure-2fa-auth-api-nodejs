const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  enable2FA,
  verify2FA,
} = require("../controllers/authController");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json({ message: "Google login successful", user: req.user });
  }
);

// Protected route example
router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

router.post("/enable-2fa", authenticateJWT, enable2FA);
router.post("/verify-2fa", authenticateJWT, verify2FA);

module.exports = router;
