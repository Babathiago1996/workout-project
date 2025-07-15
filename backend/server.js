require("dotenv").config()
const express=require("express")
const workoutRouters=require("./routes/Workouts")
const userRouter=require("./routes/userRouter")
const mongoose=require("mongoose")
const cors = require("cors");


// express app
const app=express()

// middleware

app.use((req, res, next)=>{
    next()
})
app.use(express.json())
app.use(cors())
app.get("/", (req,res)=>{
  res.status(200).json({message:"backend is running "})
})


// routes
app.use("/api/workouts", workoutRouters )
app.use("/api/user", userRouter)

// connect mongoose to database
mongoose.connect(process.env.MONGO_URI, {dbName:"workouts"})
.then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`connected successfully & listening on port ${process.env.PORT} `);
  });
}).catch((error)=>{
    console.log(error)
})



