const jwt=require("jsonwebtoken")
const User=require("../models/userModelSchema")
const requireAuth= async(req,res,next)=>{
const {authorization}=req.headers
if(!authorization || !authorization.startsWith("Bearer")){
    return res.status(401).json({error:"Authourization token is required"})
}

try {
    const token = authorization.split(" ")[1];

 const {_id} = jwt.verify(token, process.env.SECRET)
 req.user= await User.findById(_id).select("-password")
 next()

} catch (error) {
   res.status(401).json({error:"Invalid or Expired token"})
}


}
module.exports=requireAuth