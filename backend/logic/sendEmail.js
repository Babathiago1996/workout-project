const nodemailer=require("nodemailer")

const sendEmail=async (email, subject, message)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        },
        connectionTimeout:10000
    })
   const mailOption = {
     from: process.env.EMAIL,
     to: email,
     subject: subject,
     html: message,
   };
  try {
    await transporter.sendMail(mailOption)
    console.log("Email sent to:", email)
  } catch (error) {
    console.error(" email error", error.message)
    throw new Error("failed to send email")
  }  
}
module.exports=sendEmail