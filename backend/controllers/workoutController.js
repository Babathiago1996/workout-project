const Workout = require("../models/workoutmodel");
const mongoose=require("mongoose")

// create workout
const createWorkout=async (req, res)=>{
    const { title, load, reps } = req.body;
    try {
      const user_id = req.user._id;

      const workout = await Workout.create({ title, load, reps, user_id });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}
// get all workout
const getAllworkout=async (req,res)=>{
  const user_id = req.user._id;

    const workout=await Workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json(workout)
}
const getSingleworkout=async (req, res)=>{
    
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"no such workout"})
        }

      const workout=await Workout.findById(id) 
      if(!workout) {
        return res.status(404).json({error:"workout not found"})
      }
      res.status(200).json(workout)
    } 
    const updateWorkout=async(req,res)=>{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ error: "no such workout" });
        }
        const workout=await Workout.findOneAndUpdate({_id:id}, {...req.body})
        if (!workout) {
          return res.status(404).json({ error: "workout not found" });
        }
        res.status(200).json(workout);
    }
    const deleteWorkout=async(req,res)=>{
        const {id}=req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ error: "no such workout" });
        }
        const workout=await Workout.findOneAndDelete({_id:id})
        if (!workout) {
          return res.status(404).json({ error: "workout not found" });
        }
        res.status(200).json(workout);
    }






module.exports={createWorkout,getAllworkout,getSingleworkout,updateWorkout, deleteWorkout}