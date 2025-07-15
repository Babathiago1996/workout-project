const generateOTP=()=>{
const result=Math.floor(1000 + Math.random()*9000).toString()
  return result;

} 
module.exports=generateOTP
