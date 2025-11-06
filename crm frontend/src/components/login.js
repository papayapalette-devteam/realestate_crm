
import React, { useState } from "react";
import image from "../components/Assests/miniature-house-with-keys-on-wooden-background-real-estate-concept-ai-generated-artwork-photo.jpg";
import { useNavigate } from "react-router-dom";
import api from '../api'
import Swal from 'sweetalert2';
// import ChangePasswordModal from "./changepassworddoctor";
import logo from "../components/Assests/bharat proptetied.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // 👁️ eye icons


function Login() {

  //  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const navigate=useNavigate()

  const [Email,setEmail]=useState("")
  const[Password,setPassword]=useState("")
  const [showPassword, setShowPassword] = useState(false);


const login = async (e) => {
  e.preventDefault();


    try {
      const resp = await api.post('api/sign-in', { Email, Password });

      if(resp.status===200)
      {
      // Success
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: resp.data.message || 'Welcome!',
        showConfirmButton: true,
         customClass: {
          confirmButton: 'my-swal-button',
        },
      });
    }

      console.log(resp);
      
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('user', JSON.stringify(resp.data.user));

      navigate('/dashboard');

    } catch (error) {

      const message = error.response?.data?.message || 'Something went wrong!';

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: message,
          showConfirmButton: true,
             customClass: {
          confirmButton: 'my-swal-button',
        },
        });
      }
    }





  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* ==== LEFT SIDE - Text Content ==== */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 text-white flex-col justify-center px-12">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Manage Your Work <br /> Smarter & Faster
        </h1>
        <p className="text-lg opacity-90 mb-8">
          Streamline your workflow, track performance, and stay connected — all
          in one place. Your productivity dashboard awaits!
        </p>

        <div className="mt-8">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl">🚀</span>
            <span className="font-medium">Boost productivity</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl">📊</span>
            <span className="font-medium">Track progress easily</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">💡</span>
            <span className="font-medium">Stay inspired & organized</span>
          </div>
        </div>

        <p className="text-sm mt-10 opacity-80">
          © {new Date().getFullYear()} Bharat Properties — All rights reserved.
        </p>
      </div>

      {/* ==== RIGHT SIDE - Sign In Form ==== */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 bg-white">
        <form
          onSubmit={login}
          className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-auto" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Welcome Back
          </h2>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600 mb-6">
            <span>Need an account? </span>
            <a
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a
              href="/forgot"
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
