import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://workout-project-1.onrender.com/api/user/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),

        }
      );
      const json = await response.json();
      if (response.ok) {
        toast.success(json.message);
        navigate("/verify-otp", { state: { email } });
      } else {
        toast.error(json.message || "registration Failed");
      } 
    } catch (error) {
      toast.error("an error occured. please try again.")
    }
   

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email<sup className="text-red-500">*</sup>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password<sup className="text-red-500">*</sup>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Sign Up</button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default RegisterPage;
