import React, { useState } from "react";
import moment from "moment";
import ShowModal from "./ShowModal";
import { ToastContainer, toast } from "react-toastify";
import {useAuthContext} from "../hooks/useAuthContext"

const WorkoutDetails = ({ workout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [reps, setReps] = useState(workout.reps);
  const [load, setLoad] = useState(workout.load);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isdeleting, setIsDeleting] = useState(false);
  
const {user}=useAuthContext()
  const openModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowAnimation(true);
    }, 10);
  };
  const closeModal = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    // const confirmed = window.confirm(
    //   "Are your sure you want to delete this workout ?"
    // );
    // if (!confirmed) return;

    if(!user){
      toast.error("you must be logged in")
      return
    }
    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://workout-project-1.onrender.com/api/workouts/${workout._id}`,
        { method: "DELETE", headers:{
          Authorization:`Bearer ${user.token}`
        }}
      );
      const json = await response.json();
      if (response.ok) {
        setShowModal(false);
        closeModal();
        window.location.reload();
      } else {
        setError(json.error);
        toast.error("server error");
      }
    } catch (error) {
      setIsDeleting(false);
    }
  };
  const handleCancel = () => {
    setError(null);
    setTitle("");
    setLoad("");
    setReps("");
    setIsEditing(false);
  };
  const handleSave = async () => {
    if(!user){
      toast.error("you must be logged in")
      return
    }
    if (
      title === workout.title &&
      load === workout.load &&
      reps === workout.reps
    ) {
      setIsEditing(false);
      return;
    }
    const updateWorkout = { title, reps, load };
    try {
      const response = await fetch(
        `https://workout-project-1.onrender.com/api/workouts/${workout._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${user.token}`
          },
          body: JSON.stringify(updateWorkout),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setError(json.error || "Update Failed");
        toast.error("server error");
      } else {
        setError(null);
        setIsEditing(false)
        toast.success("Workout Updated Successfully");
        
        window.location.reload();
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4 ">
        <div className="flex justify-between items-start">
          <h2 className="text-[26px] font-bold  mb-2 capitalize text-black outline-0">
            <strong className="text-green-500">Title: </strong>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-5 p-1 rounded w-full  outline-0  text-black border-red-200"
              />
            ) : (
              workout.title
            )}
          </h2>
          {!isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="text-[20px] px-3 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={openModal}
                className="text-[20px] px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="text-[15px] px-3 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-[15px] px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <p className="text-black mb-1 text-[25px] font-bold">
          <strong className="text-blue-500">Load (kg) : </strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              className="border-5 p-1 rounded w-full outline-0 text-black border-red-200"
            />
          ) : (
            workout.load
          )}
        </p>
        <p className=" mb-1 text-[25px] font-bold">
          <strong className="text-red-300">Reps: </strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="border-5 p-1 rounded w-full outline-0  text-black border-red-200"
            />
          ) : (
            workout.reps
          )}
        </p>
        {!isEditing && (
          <>
            <p className="text-[25px] text-gray-400 mt-2">
              <strong>Created: </strong>
              {moment(workout.createdAt).fromNow()}
            </p>
            <p className="text-[25px] text-gray-400">
              <strong>Updated: </strong>
              {moment(workout.updatedAt).fromNow()}
            </p>
          </>
        )}
      </div>
      {showModal && (
        <ShowModal
          closeModal={closeModal}
          handleDelete={handleDelete}
          isdeleting={isdeleting}
        />
      )}
    </div>
  );
};

export default WorkoutDetails;
