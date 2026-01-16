import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {BookCheck,BookA,  User,  Power, Plus, Key, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function Courses() {
 const[userName , setUserName] = useState()
 const [course , setCourse] = useState([])
 const[creatorName , setCreatorName] = useState("")
 const [updatedTitle , setUpdatedIdTitle] = useState("");
 const [updatedDescription , setUpdatedIdDescription] = useState("");
 const [updatedPrice , setUpdatedIdPrice] = useState("");
 const [updatedImgUrl , setUpdatedIdImgUrl] = useState("");
 const [isSideBarEnabled , setIsSideBarEnabled] = useState(false)
 const [updatedId , setUpdatedId] = useState("")
 const userToken = localStorage.getItem("userToken")
 const adminToken = localStorage.getItem("adminToken")
 const navigate = useNavigate()

  useEffect(() => {
  if(!userToken && !adminToken){
   setUserName("Login")
 }else if(userToken && !adminToken){
    async function getUserData(){
    const reponse = await axios.get("http://localhost:3000/user/user-detail" , {
     headers:{
      authorization : userToken
     }
   })
   setUserName(reponse.data.name)
  }
  getUserData()
 }else if(!userToken && adminToken){
   async function getAdminData(){
    const reponse = await axios.get("http://localhost:3000/admin/admin-detail" , {
      headers : {
        authorization : adminToken
      }
    })
    // console.log(reponse.data.name)
    setUserName(reponse.data.name)
   }
   getAdminData()
 }

  async function getCourse() {
     const reponse = await axios.get("http://localhost:3000/user/courses")
    //  console.log(reponse.data.courses)
     setCourse(reponse.data.courses)
  }
  getCourse()


},[userToken , adminToken , updatedId , isSideBarEnabled])


async function buyNow(courseId){

  console.log(courseId)
  const reponse = await axios.post("http://localhost:3000/user/buy-Course" , 
  {
    "courseId" : courseId
  },
  {
    headers:
    {
    authorization : userToken
    }
  })
  alert("Buyed succefully")
  console.log(reponse.data.message)
}

function handleEnable(){
  setIsSideBarEnabled(true)
}

function logout(){
  localStorage.removeItem("userToken")
  localStorage.removeItem("adminToken")
}

function navigateLogin(){
  navigate("/userSignin")
}
function navigateSignUp(){
  navigate("/userSignup")
}

function navigateAddCourse(){
  navigate("/admin/addcourse")
}
function navigatePurchasedCourse(){
  navigate("/user/purchase")
}


async function updateCourse(courseId) {
  const reponse = await axios.put("http://localhost:3000/admin/update-course" , {
    "courseId" : courseId,
    "updatedPrice":parseInt(updatedPrice),
    "updatedDescription":updatedDescription,
    "updatedImgUrl":updatedImgUrl,
    "updatedTitle":updatedTitle
  },{
    headers:{
      authorization:adminToken
    }
  })
  
  console.log(reponse.data.message)
  setUpdatedId("")
  
}

async function deleteCourse(courseId){
  console.log(courseId)
   const response = await axios.delete("http://localhost:3000/admin/remove-course" ,{
    params:{
     courseId:courseId
    },
    headers:{
      authorization : adminToken
    }
   }) 
   console.log(response.data.message)
  //  setUpdatedId("")
}



  return (
    <>
    <div className=' bg-black'>
      <div className="bg-[#0f1729]  flex-row justify-between items-center">
        {/* start of navbar */}
     <div className=" bg-[#0f1729] p-3 ">
      <nav className="bg-[#303b4d] rounded-xl border h-fit border-gray-800/50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center ">
            {/* Logo */}
            
            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              <a href="#" className=" px-4 py-2 text-gray-400 hover:text-white font-medium">
                Home
              </a>
              {userToken && !adminToken &&( 
                <a onClick={navigatePurchasedCourse} className="px-6 py-2 text-gray-400 hover:text-white hover:cursor-pointer font-medium transition">
                Purchased
              </a>)}
              {!userToken && adminToken && ( 
                <a onClick={navigateAddCourse} className="px-6 py-2 text-gray-400 hover:text-white hover:cursor-pointer font-medium transition">
                Add course
              </a>)}

              
              <a href="#" className="px-6 py-2 text-gray-400 hover:text-white font-medium transition">
                Profile
              </a>
              <a href="#" className="px-6 py-2 text-gray-400 hover:text-white font-medium transition">
                Help
              </a>
            </div>
          </div>

          {/* Right Side - Notifications and Profile */}
          <div className="flex items-center relative ">
            {/* Profile Avatar */}
            <button 
             onClick={handleEnable}
             className=" w-20  hover:cursor-pointer transition">
              
              <h2 className='font-bold text-white scale-100 hover:scale-110 transition line-clamp-1'>{userName}</h2>
            </button>
          {isSideBarEnabled && (
             <div className="absolute right-0 top-full mt-2 z-50">
                  <div className="w-64 bg-[#2a3441] rounded-2xl p-6 shadow-lg">
                      {/* Menu Items */}
                      <nav className="space-y-2">
                        {/* Dashboard */}


                        {userToken && !adminToken && (
                        <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                          <BookCheck className="w-5 h-5 text-gray-400"/>
                            <span onClick={navigatePurchasedCourse} className="text-gray-300 text-base">Purchased</span>
                          </div>
                        </div>
                        )
                        }
                        {!userToken && adminToken && (
                        <div className="flex-row items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                          <BookCheck className="w-5 h-5 text-gray-400"/>
                            <span className="text-gray-300 text-base">Update Courses</span>
                          </div>
                        </div>
                        )
                        }
                        {!userToken && adminToken && (
                        <div className="flex-row items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                          <BookA className="w-5 h-5 text-gray-400"/>
                            <span onClick={navigateAddCourse} className="text-gray-300 text-base">Add course</span>
                          </div>
                        </div>
                        )
                        }
                        {/* E-Commerce */}


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
          )}
          {
            isSideBarEnabled && !userToken && !adminToken &&(
               <div className="absolute right-0 top-full mt-2 z-50">
                  <div className="w-64 bg-[#2a3441] rounded-2xl p-6 shadow-lg">
                    {/* Sidebar Title */}
                      {/* Menu Items */}
                      <nav className="space-y-2">
                        {/* Dashboard */}
                        <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                          <Key className="w-5 h-5 text-gray-400"/>
                            <span onClick={navigateLogin} className="text-gray-300 text-base">Login</span>
                          </div>
                        </div>

                        {/* Log Out */}
                        <div className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
                          <div className="flex items-center gap-3">
                            <Power className="w-5 h-5 text-gray-400" />
                            <span onClick={navigateSignUp} className="text-gray-300 text-base">SignUp</span>
                         </div>
                     </div>
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
          {/* side bar content */}
        </div>
      </nav>
    </div>
        {/* end of navbar */}
      { !adminToken && ( <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:px-2 xl:grid-cols-3 p-2 auto-rows-fr">
          <ul role="list" className="grid gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-y-6 xl:col-span-10">
            {course.map((course) => (
              <li key={course._id}>
                <div onClick={(e) => setIsSideBarEnabled(false)} className="flex-row bg-[#303b4d] h-full items-center border-1 border-white rounded-2xl">
                  <img
                    alt=""
                    src={course.imageUrl}
                    className="h-60 w-120 p-4  rounded-3xl "
                  />
                  <div>
                    <h3 className="text-base/7 font-bold tracking-tight m-4 text-white">{course.title}</h3>
                    <p className='text-sm font-extralight p-4 line-clamp-2 text-white '>{course.description}</p>
                    <p className='text-xl font-bold p-4 text-white '>₹ {course.price} </p>
                    <button
                     onClick={(e) => {buyNow(course._id);}}
                    className="bg-white rounded-2xl font-bold w-[90%] mr-5 ml-5  m-2 p-2  hover:cursor-pointer">Buy Now</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>)}

      { adminToken && ( 
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:px-2 xl:grid-cols-3 p-2 auto-rows-fr">
          <ul role="list" className="grid gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-y-6 xl:col-span-10">
            {course.map((course) => (
              <li key={course._id}>
                {
                 updatedId != course._id &&(
                  <div onClick={() => setIsSideBarEnabled(false)} className="flex-row bg-[#303b4d] h-full items-center border border-white rounded-2xl">
                  <img
                    alt=""
                    src={course.imageUrl}
                    className="h-60 w-120 p-4  rounded-3xl "
                  />
                  <div>
                    <h3 className="text-base/7 font-bold tracking-tight m-4 text-white">{course.title}</h3>
                    <p className='text-sm font-extralight p-4 line-clamp-2 text-white '>{course.description}</p>
                    <p className='text-xl font-bold p-4 text-white '>₹ {course.price} </p>
                    <div>
                    <button
                     onClick={(e) => {setUpdatedId(course._id)}}
                    className="bg-white rounded-2xl font-bold w-[30%] mr-5 ml-5  m-2 p-2 hover:bg-gray-300 hover:cursor-pointer ">Update</button>
                    <button
                     onClick={(e) => {deleteCourse(course._id)}}
                    className="bg-white rounded-2xl font-bold w-[30%] mr-5 ml-5  m-2 p-2 hover:bg-gray-300  hover:cursor-pointer ">Delete</button>
                    </div>
                  </div>
                </div>
                  )
                }
                {
              updatedId === course._id && (
                <div onClick={() => setIsSideBarEnabled(false)} className="flex-row bg-[#303b4d] h-full items-center border border-white rounded-2xl">
                 <div className='p-2'>
                 <label className="block m-2 text-white text-sm mb-2">
                  Updated Course title
                 </label>
                 <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedIdTitle(e.target.value)}
                  placeholder="e.g. Harkirat-dsa"
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
                <div className='p-2'>
                <label className="block m-2 text-white text-sm mb-2">
                 Updated description
                </label>
                <input
                  type="text"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedIdDescription(e.target.value)}
                  placeholder="This course will...."
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className='p-2'>
                <label className="block m-2 text-white text-sm mb-2">
                 Updated Course Price
                </label>
                <input
                  type="text"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedIdPrice(e.target.value)}
                 placeholder="e.g. ₹4999"
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className='p-2'>
                <label className="block m-2 text-white text-sm mb-2">
                 Updated URL Course Thumbnail
                </label>
                <input
                  type="text"
                  value={updatedImgUrl}
                  onChange={(e) => setUpdatedIdImgUrl(e.target.value)}
                  placeholder="e.g. http://example.jpg"
                  className="w-full bg-[#2a3441] text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
                  <div>                 
                    <button
                     onClick={(e) => {updateCourse(course._id)}}
                    className="bg-white rounded-2xl font-bold w-[90%] mr-5 ml-5 mt-7 m-2 p-2 hover:bg-gray-300 hover:cursor-pointer ">Update course</button>
                  </div>
                </div>
                  )
                }

              </li>
            ))}
          </ul>
        </div>)}
      </div>
    </div>
    </>
  )
}

export default Courses
