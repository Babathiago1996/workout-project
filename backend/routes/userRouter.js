const express = require("express");
const {
  loginUser,
  signUpUser,
  verifyOTP,
  resetPassword,
  forgotPassword,
  resendOTP,
} = require("../controllers/userController");

const router = express.Router();
// for login user
router.post("/login", loginUser);
// for user to signup
router.post("/signUp", signUpUser);
// for user otp verification
router.post("/verifyOtp", verifyOTP);
// for user fogot password
router.post("/forgot-password", forgotPassword);
// for user reset password
router.post("/reset-password", resetPassword);
// resend otp
router.post("/resend-otp", resendOTP);

module.exports = router;
