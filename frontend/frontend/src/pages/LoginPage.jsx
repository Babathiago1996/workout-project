import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {useForm} from "react-hook-form"
import { useAuthContext } from "../hooks/useAuthContext";

const LoginPage = () => {
  const{register,handleSubmit,formState:{errors}}=useForm()
  const navigate = useNavigate();
  const {user,dispatch}=useAuthContext()
  const handleLogin = async (data) => {
    const {email,password}=data
    try {
      const response = await fetch(
        "https://workout-project-1.onrender.com/api/user/login", {method:"POST", headers:{
            "Content-Type":"application/json"}, 
            body:JSON.stringify({email,password})
        }
      )
      const json= await response.json() 
      if(response.ok){
        localStorage.setItem("user", JSON.stringify(json))
        dispatch({type: "LOGIN", payload:json})
        toast.success(json.message);

        navigate("/")
      }else{
        toast.error(json.error || json.message)
      }
    } catch (error) {
     toast.error(error.message || "registration Failed");
        
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <input
            type="email"
            placeholder="Enter your registered email"
            aria-label="Enter your Email"
            {...register("email",{required:"Email is required"})}
            className={`mt-1 w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
          />
           {errors.email && (
            <p className="mt-1 text-sm text-red-600 ">
              {errors.email.message}
            </p>)}
          <input
            type="password"
            placeholder="Enter your registered Password"
            required
            aria-label="Enter your Password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message:
                  "Password must be atleast 8 character,including UpperCase,LowerCase and sign",
              },
            })}
            className={`mt-1 w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 ">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginPage;
