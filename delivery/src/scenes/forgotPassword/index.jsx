import React from "react";
import loginImg from "../../assets/login-image.jpg";

export default function ForgotPassword() {
  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="/"
      />

      <div className="flex justify-center items-center h-full ">
        <form className="max-w-[400px] w-full mx-auto bg-white p-8 rounded">
          <h2 className="text-4xl font-bold text-center py-4">TAKEAWAY</h2>
          <div className="flex flex-col mb-4">
            <label>Email</label>
            <input className="border relative bg-gray-100 p-2" type="email" />
          </div>
          <div className="flex flex-col mb-4">
            <label>New Password</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="password"
            />
          </div>
          <div className="flex flex-col ">
            <label>Confirm Password</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="password"
            />
          </div>
          <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white">
            Forgot Password
          </button>
          <p className="text-center mt-8">Go back to sign in</p>
        </form>
      </div>
    </div>
  );
}
