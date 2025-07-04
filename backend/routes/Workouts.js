const express =require("express")
const {createWorkout,getAllworkout,getSingleworkout, updateWorkout,deleteWorkout}=require("../controllers/workoutController")

const router=express.Router()
// get all routes
router.get("/", getAllworkout )

// get a single workout
router.get("/:id", getSingleworkout) 
// create a workout
router.post("/", createWorkout);
// update a workout
router.patch("/:id", updateWorkout)
  
// delete a wokout
router.delete("/:id", deleteWorkout) 





module.exports=router