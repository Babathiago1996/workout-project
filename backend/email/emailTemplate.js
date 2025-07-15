const generateOtpEmail = (otp, user = "User") => `
  <div style="font-family:Arial, sans-serif; background-color:#f9f9f9; padding:20px; color:#333;">
    <div style="max-width:500px; margin:auto; background-color:white; border-radius:10px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      <h2 style="text-align:center; color:#4CAF50;">🏋‍♀ Workout App Verification</h2>
      <p>Hi <strong>${user}</strong>,</p>
      <p>Thanks for signing up! To verify your email, please use the OTP code below:</p>
      <div style="font-size:24px; font-weight:bold; text-align:center; color:#4CAF50; margin:20px 0;">
        ${otp}
      </div>
      <p>This OTP will expire in <strong>10 minutes</strong>.</p>
      <p>If you did not initiate this request, you can safely ignore this email.</p>
      <hr style="margin:30px 0;">
      <p style="font-size:12px; text-align:center; color:#999;">&copy; ${new Date().getFullYear()} Workout App. All rights reserved.</p>
    </div>
  </div>
`;
const generateForgotPasswordEmail = (otp, username = "User") => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #4CAF50; text-align: center;">🔐 Reset Your Workout App Password</h2>
      <p style="font-size: 16px;">Hello <strong>${username}</strong>,</p>
      <p style="font-size: 15px;">
        We received a request to reset your password. Use the OTP below to complete your password reset. This OTP is valid for <strong>10 minutes</strong>.
      </p>
      <div style="font-size: 26px; font-weight: bold; color: #4CAF50; text-align: center; margin: 20px 0;">
        ${otp}
      </div>
      <p style="font-size: 14px; color: #666;">
        If you didn’t request this, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; margin-top: 30px;">Thanks,<br/>The Workout App Team 💪</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #999; text-align: center;">
        &copy; ${new Date().getFullYear()} Workout App. All rights reserved.
      </p>
    </div>
  </div>
`;

module.exports = { generateOtpEmail, generateForgotPasswordEmail };
