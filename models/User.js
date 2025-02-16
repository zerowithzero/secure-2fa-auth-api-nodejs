const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true, sparse: true }, // Store Google OAuth ID
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    }, // Required only if not using Google OAuth
    isVerified: { type: Boolean, default: false }, // Email verification
    twoFactorEnabled: { type: Boolean, default: false }, // 2FA status
    twoFactorSecret: { type: String, default: null }, // 2FA secret key
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
