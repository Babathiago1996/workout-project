const User = require("../models/userModelSchema");
const generateOTP = require("../utils/otp");
const sendEmail = require("../logic/sendEmail");
const bcrypt = require("bcrypt");
const { generateForgotPasswordEmail, generateOtpEmail} = require("../email/emailTemplate");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.SECRET, { expiresIn: "1d" });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All field must be filled" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect Email" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "incorrect password" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ error: "please verify your email before loggin in" });
    }
    const token = generateToken(user._id);
    res
      .status(200)
      .json({ message: "login sucessfull", email, token, id: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp(email, password);
    res.status(201).json({ email, message: "OTP sent to your email" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Already Verified" });
    }
    if (user.otp === otp && user.otpExpires > Date.now()) {
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
      const token = generateToken(user._id);

      return res
        .status(200)
        .json({
          message: "Email verified successfully",
          token,
          email: user.email,
        });
    } else {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }
  } catch (error) {
    console.error("verify otp error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not Found" });
    }
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    await sendEmail(
      email,
      ` Workout Password Reset OTP`,
      generateForgotPasswordEmail(otp, user.email)
    );
    res.status(200).json({ message: "OTP for your password reset" });
  } catch (error) {
    console.error("forgot password error ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "You input the wrong Email" });
    }
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or Expired OTP" });
    }
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res
        .status(400)
        .json({
          error: "New password must be different from the old password",
        });
    }
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    const token = generateToken(user._id);
    res
      .status(200)
      .json({
        message: "password reset successfully",
        token,
        email: user.email,
      });
  } catch (error) {
    console.error("reset password error", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Generate new OTP and update expiry
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // Send email
    const html = generateOtpEmail(otp, user.email);
    await sendEmail(user.email, "Your New OTP Code", html);

    res.status(200).json({ message: "New OTP sent to your email" });
  } catch (error) {
    console.error("Resend OTP error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginUser,
  signUpUser,
  verifyOTP,
  forgotPassword,
  resetPassword,
  resendOTP,
};
