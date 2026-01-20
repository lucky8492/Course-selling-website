import {React , useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {BookCheck,BookA,  User,  Power, Plus, Key, Trash } from 'lucide-react'
import { useNavbar } from '../context/NavbarContext';
function NavBar() {
   const [isSideBarEnabled , setIsSideBarEnabled] = useState(false);
   const navigate = useNavigate();
   const[render , setRender] = useState(false);
   const {userToken , adminToken , userName} = useNavbar()


   const  navigateBrowser = (route)=>{
    
     if(route === "home")navigate("/");
     if(route === "signup")navigate("/userSignup");
     if(route === "signin")navigate("/userSignin");
     if(route === "purchased")navigate("/user/purchase");
     if(route === "addCourse")navigate("/admin/addcourse");
   }
   
   function logout(){
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    
   }
  

  return (
     <div className="p-3 w-full relative ">
      <nav  className="backdrop-blur-sm rounded-xl border w-full relative z-50 border-white">
        <div  className="flex items-center justify-between px-6 py-4">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center ">
            {/* Logo */}
            
            {/* Navigation Links */}
            <div className="flex items-center text-white gap-1">
              <a onClick={() => navigateBrowser("home")} className=" px-4 py-2 border rounded-lg hover:text-gray-400 hover:cursor-pointer font-mono">
                Home
              </a>
             {
             userToken && !adminToken &&
             (
             <a onClick={()=>navigateBrowser("purchased")} className="px-4 py-2 ml-1 rounded-lg border  hover:text-gray-400 hover:cursor-pointer font-mono transition">
               Purchased
             </a>
              )}
                
             {
             !userToken && adminToken &&
             (
             <a onClick={() => navigateBrowser("addCourse")} className="px-6 ml-1 py-2 border rounded-lg hover:text-gray-400  hover:cursor-pointer font-mono transition">
               Add Course
             </a>
              )}
                
              <a href="#" className="px-6 py-2 rounded-lg ml-1 border  hover:text-gray-400 font-mono transition">
                Profile
              </a>
              <a href="#" className="px-6 py-2 rounded-lg ml-1 border hover:text-gray-500 font-mono transition">
                Help
              </a>
            </div>
          </div>

          {/* Right Side - Notifications and Profile */}
          <div className="flex items-center relative ">
            {/* Profile Avatar */}
            { !userToken&& !adminToken&& (
              <button onClick={(e) => setIsSideBarEnabled(true)} className=" w-20  hover:cursor-pointer transition">
              <h2 className='font-bold text-white scale-100 hover:scale-110 transition line-clamp-1'>Login</h2>
              </button>
            )}
            { userToken && !adminToken &&(
              <button onClick={(e) => setIsSideBarEnabled(true)} className=" w-20  hover:cursor-pointer transition">
              <h2 className='font-bold text-white scale-100 hover:scale-110 transition line-clamp-1'>{userName}</h2>
              </button>
            )}
            { !userToken && adminToken &&(
              <button onClick={(e) => setIsSideBarEnabled(true)} className=" w-20  hover:cursor-pointer transition">
              <h2 className='font-bold text-white scale-100 hover:scale-110 transition line-clamp-1'>{userName}</h2>
              </button>
            )}
            {isSideBarEnabled && (
             <div
                className="fixed inset-0 z-40"
                onClick={() => setIsSideBarEnabled(false)}
              />
               )}

            {isSideBarEnabled && (
               <div className="absolute right-0 top-full mt-2 z-[9999]">
                  <div className="w-64 bg-[#2a3441] rounded-2xl p-6 shadow-lg">
                      {/* Menu Items */}
                      <nav className="space-y-2">
                        
                        { userToken && !adminToken && (
                        <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                          <BookCheck className="w-5 h-5 text-gray-400"/>
                            <span onClick={() => navigateBrowser("purchased")} className="text-gray-300 text-base">Purchased</span>
                          </div>
                        </div>
                        )
                        }

                        {!userToken && adminToken && (
                        <div className="flex-row items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                          <BookA className="w-5 h-5 text-gray-400"/>
                            <span onClick={()=>navigateBrowser("addCourse")} className="text-gray-300 text-base">Add course</span>
                          </div>
                        </div>
                        )
                        }      

                        {!userToken && !adminToken && (
                        <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                          <Key className="w-5 h-5 text-gray-400"/>
                            <span onClick={()=>navigateBrowser("signin")} className="text-gray-300 text-base">Login</span>
                          </div>
                        </div>
                        )
                        }                       
                        {!userToken && !adminToken && (
                        <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                          <Key className="w-5 h-5 text-gray-400"/>
                            <span onClick={()=>navigateBrowser("signup")} className="text-gray-300 text-base">SignUp</span>
                          </div>
                        </div>
                        )
                        } 
                                            
                        {/* Log Out */}
                        <div className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                            <Power className="w-5 h-5 text-gray-400" />
                            <span onClick={logout} className="text-gray-300 text-base">Log Out</span>
                         </div>
                     </div>
                 </nav>
             </div>
          </div> 
            )
            }
          </div>
        </div>
      </nav>
     </div>
  )
}

export default NavBar
