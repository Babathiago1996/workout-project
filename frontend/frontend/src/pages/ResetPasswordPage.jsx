import React from 'react'
import { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const ResetPasswordPage = () => {
    const {state}=useLocation()
    const [otp, setOtp]=useState("")
    const [newPassword, setNewPassword]=useState("")
    const email=state?.email
    const navigate=useNavigate()
     const handleReset= async ()=>{
        try {
            const response = await fetch(
                  "https://workout-project-1.onrender.com/api/user/reset-password",
                  {
                    method: "POST",
                    header: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email,otp, newPassword }),
                  }
                );
                const json = await response.json();
                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(json))
                  toast.success(json.message);
                  navigate("/");
                } else {
                  toast.error(json.error.message);
                }
        } catch (error) {
         toast.error(error.message || "an error occured. please try again");
            
        }
     }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleReset} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h2>
          <div className='mb-6'>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPasswordPage