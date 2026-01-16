import {React , useState , useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AdminSignup() {
    const [adminName , setAdminName] = useState("");
    const [adminEmail , setAdminEmail]  = useState("");
    const [adminPassword , setAdminPassword] = useState("");
    const [message , setMessage] = useState();
    const [color , setColor] = useState(false);
    const navigate = useNavigate()

  
    async function createAccount (){
      try{ 
        const response  = await axios.post("http://localhost:3000/admin/signup" , {
        "email" : adminEmail,
        "password" : adminPassword,
        "name" : adminName
       })
  
        if(response){
         setMessage(response.data.message)
         setColor(true)
         navigate("/adminSignin")
        }else{
          console.log("bad input")
        }
      }catch(e){
       setColor(false)
      if(e.response.status === 422){
         setMessage("Invalid "+e.response.data.message[0].path[0] + " format")
      }else{
        setMessage(e.response.data.message)
      }
      }
    }
   function navigateSignin(){
    navigate("/adminSignin")
   }
  return (
    <div className="min-h-screen bg-[#0f1729] flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Form */}
        <div className="bg-[#1a2332] rounded-2xl p-8 md:p-12">
    

          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">
            Create Admin Account
          </h1>


          {/* Form Fields */}
          <div className="space-y-6">
            <div className="">
              {/* Email */}
              <div className='p-2'>
                <label className="block m-2 text-white text-sm mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Full Name */}
               <div className='p-2'>
                <label className="block text-white text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
               <div className='p-2'>
                <label className="block text-white text-sm mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="e.g. Lucky Mishra"
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

 

            {/* Submit Button */}
            <button
              type="button"
              onClick={createAccount}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-medium rounded-lg px-4 py-3 transition"
            >
              Create an account
            </button>
            <p className={!color ? `text-red-400 p-2` : `text-green-400 p-2`}>{message}</p>
           <p className="text-gray-400 mb-8">
              Already have an account?{' '}
            <a onClick={navigateSignin} className="text-blue-500 hover:text-blue-400">
              Login here
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

export default AdminSignup
