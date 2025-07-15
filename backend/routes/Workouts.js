const express =require("express")
const {createWorkout,getAllworkout,getSingleworkout, updateWorkout,deleteWorkout}=require("../controllers/workoutController")
const requireAuth=require("../middleware/requireAuth")
const router=express.Router()

// require auth for authentification verification and protect route if not authenticated
router.use(requireAuth)
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