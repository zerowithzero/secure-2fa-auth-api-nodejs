const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

// 📌 How this works:

// Throws an error if the user is not found.
// Passes it to errorHandler.js.
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw { status: 404, message: "User not found" }; // Throw an error
    }
    res.json(user);
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

exports.verify2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || !user.isTwoFactorEnabled) {
      return res.status(400).json({ message: "2FA is not enabled" });
    }

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.json({ message: "2FA verification successful" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying 2FA", error });
  }
};

// Generate and return a 2FA secret and QR code
exports.enable2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = speakeasy.generateSecret({ length: 20 });

    // Save the secret in the database
    user.twoFactorSecret = secret.base32;
    user.isTwoFactorEnabled = true;
    await user.save();

    // Generate QR code for Google Authenticator
    const otpAuthUrl = `otpauth://totp/secure_auth_api?secret=${secret.ascii}&issuer=secure_auth_api`;
    QRCode.toDataURL(otpAuthUrl, (err, imageUrl) => {
      if (err)
        return res.status(500).json({ message: "QR Code generation failed" });

      res.json({
        message: "2FA enabled",
        secret: secret.base32, // Show only for testing
        qrCode: imageUrl, // Send QR Code image URL
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error enabling 2FA", error });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
