const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const validator=require("validator")
const generateOTP=require("../utils/otp")
const sendEmail=require("../logic/sendEmail")
const {generateOtpEmail}=require("../email/emailTemplate")


const Schema=mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: String,
    otpExpires:Date,
    isVerified:{
        type:Boolean,
        default:false
    }
      
    
  },
  { timestamps: true }
);
 userSchema.statics.signUp=async function(email,password){
  
    if (!email || !password) {
      throw Error("All field must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Not a valid email");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Your password is not strong enough");
    }

    const existingUser = await this.findOne({ email });
    if (existingUser) {
      if(existingUser.isVerified){
        throw new Error("Email already exisits and is already verified")
      }else{
        if(existingUser.otpExpires < Date.now()){
          await this.deleteOne({ email });

        }else{
          throw new Error ("OTP already sent to the email. please check your inbox or wait for it to expire")
        }
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000

    const user = await this.create({ email, password: hash, otp, otpExpires })
    const html = generateOtpEmail(otp, user.email);
    
    await sendEmail(
      email,
      `Your Workout App OTP Code`,
      html
    );

    return user;
    
  } 


module.exports=mongoose.model("User", userSchema)