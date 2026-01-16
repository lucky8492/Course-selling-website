import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSignin() {
  
  const [userEmail , setUserEmail]  = useState("");
  const [userPassword , setUserPassword] = useState("");
  const [message , setMessage] = useState();
  const [color , setColor] = useState(false);
  const navigate = useNavigate()

  async function login (){
    try{ 
      const response  = await axios.post("http://localhost:3000/user/signin" , {
      "email" : userEmail,
      "password" : userPassword,
     })
       
      if(response){
       // to put is reponse.data.token
       localStorage.setItem("userToken" ,response.data.token)
        
       setMessage("signed in successfully")
       setColor(true)
       navigate("/")
      }else{
        console.log("bad input")
      }
    }catch(e){

      setColor(false)
      if(e.response.status === 422){
        const errors = JSON.parse(e.response.data.message);//although axois parses res into json format but in this e is json fromatted stringfied  therefore we explicitly parsing it in jsno format
       setMessage("Invalid " + errors[0].path[0] + " format");
      }else{
        setMessage(e.response.data.message)
      }
    }
  }

  function navigateSignup(){
    navigate("/userSignup")
  }
 function navigateAdminSignup(){
  navigate("/adminSignup")
 }
 
  return (
    <div className="min-h-screen bg-[#0f1729] flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Form */}
        <div className="bg-[#1a2332] rounded-2xl p-8 md:p-12">
    

          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">
            Login 
          </h1>


          {/* Form Fields */}
          <div className="space-y-6">
            <div className="">
              {/* Email */}
              <div className='p-2'>
                <label className="block  text-white text-sm mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
               <div className='p-2'>
                <label className="block text-white text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

 

            {/* Submit Button */}
            <button
              type="button"
              onClick={login}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-medium rounded-lg px-4 py-3 transition"
            >
              Login
            </button>
              <p className={!color ? `text-red-400 p-2` : `text-green-400 p-2`}>{message}</p>
          <p className="text-gray-400 mb-8">
              Don't have an account?{' '}
            <a onClick={navigateSignup} className="text-blue-500 hover:text-blue-400 hover:cursor-pointer">
              Signup here
            </a>
            .
          </p>
          <p className="text-gray-400 mb-8">
              Signup as an admin?{' '}
            <a onClick={navigateAdminSignup} className="text-blue-500 hover:text-blue-400 hover:cursor-pointer">
              Signup here
            </a>
            .
          </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=600&fit=crop"
              alt="Person working on laptop"
              className="w-full max-w-lg rounded-2xl opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignin
