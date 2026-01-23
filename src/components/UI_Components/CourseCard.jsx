import React, { useEffect, useState } from 'react'
import { useCourseCard } from '../context/CourseCardContex'
import axios from 'axios'
const API = import.meta.env.VITE_RENDER_API




function CourseCard() {
  const {course ,setCourses, userTokens , adminTokens} = useCourseCard()
  const [updatedId , setUpdatedId] = useState("")
  const [updatedTitle , setUpdatedIdTitle] = useState("");
  const [updatedPrice , setUpdatedIdPrice] = useState("");
  const [updatedImgUrl , setUpdatedIdImgUrl] = useState("");
  const [updatedDescription , setUpdatedIdDescription] = useState("");
 

useEffect(()=>{
    async function getCourse() {
     const reponse = await axios.get(`${API}/user/courses`)
    //  console.log(reponse.data.courses)
     setCourses(reponse.data.courses)
  }
  getCourse()
},[userTokens , adminTokens , updatedId])


  async function buyNow(courseId){
  if(!userTokens){
    alert('Login to buy courses')
    return
  }
  const reponse = await axios.post(`${API}/user/buy-Course` , 
  {
    "courseId" : courseId
  },
  {
    headers:
    {
    authorization : userTokens
    }
  })
  alert("Buyed succefully")
}

async function deleteCourse(courseId){
   const response = await axios.delete(`${API}/admin/remove-course` ,{
    headers:{
      authorization:adminTokens
    },
    data:{
      courseId:courseId
    }

   })
   alert(response.data.message)
   setUpdatedId("")
}

async function updateCourse(courseId) {
 
  const reponse = await axios.put(`${API}/admin/update-course` , 
      {
      courseId : courseId,
      updatedPrice:parseInt(updatedPrice),
      updatedDescription:updatedDescription,
      updatedImgUrl:updatedImgUrl,
      updatedTitle:updatedTitle        
      },{
      headers:{
        authorization : adminTokens
      }
  })
  
  alert(reponse.data.message)
  setUpdatedId("")
   setUpdatedIdTitle("")
   setUpdatedIdDescription("")
   setUpdatedIdImgUrl("")
   setUpdatedIdPrice("")
}

  return (
    <>
    
<div className="mx-auto z-0 flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 p-2">
  <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
    {course.map((course) => (
      <li key={course._id} className="w-full">
        {
          updatedId != course._id && (
        <div className="flex flex-col backdrop-blur-3xl h-full items-center border border-white rounded-2xl">
          <img
            alt=""
            src={course.imageUrl}
            className="h-48 sm:h-52 md:h-56 lg:h-60 w-full object-cover p-4 z-0 rounded-3xl"
          />
         { !adminTokens &&(
           <div className='text-white w-full px-2'>
           <h3 className="text-base sm:text-lg font-bold tracking-tight m-2 sm:m-4">{course.title}</h3>
           <p className='text-xs sm:text-sm font-extralight px-2 sm:p-4 line-clamp-2'>{course.description}</p>
           <p className='text-lg sm:text-xl font-bold px-2 sm:p-4'>₹ {course.price}</p>
           <button
            onClick={(e) => {buyNow(course._id);}}
           className="border border-white text-white hover:bg-white hover:text-black rounded-2xl font-bold w-[90%] mx-auto block m-2 p-2 mb-3 hover:cursor-pointer">Buy Now</button>
         </div>
        )}
        {adminTokens && (
          <div className='w-full px-2'>
            <h3 className="text-base sm:text-lg font-bold tracking-tight m-2 sm:m-4 text-white">{course.title}</h3>
            <p className='text-xs sm:text-sm font-extralight px-2 sm:p-4 line-clamp-2 text-white'>{course.description}</p>
            <p className='text-lg sm:text-xl font-bold px-2 sm:p-4 text-white'>₹ {course.price}</p>
            <div className='flex flex-col sm:flex-row gap-2 px-2 sm:px-4 pb-4'>
            <button
             onClick={(e) => {setUpdatedId(course._id)}}
            className="bg-white rounded-2xl font-bold w-full sm:w-[45%] p-2 hover:bg-gray-300 hover:cursor-pointer">Update</button>
            <button
             onClick={(e) => {deleteCourse(course._id)}}
            className="bg-white rounded-2xl font-bold w-full sm:w-[45%] p-2 hover:bg-gray-300 hover:cursor-pointer">Delete</button>
            </div>
          </div>
        )
        }
        </div>
          )
        }

        {
          updatedId === course._id && (
         <div className="flex flex-col backdrop-blur-lg h-full items-center border border-white rounded-2xl p-2 sm:p-4">
            <div className='w-full p-2'>
            <label className="block m-2 text-white text-xs sm:text-sm mb-2">
              Updated Course title
            </label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedIdTitle(e.target.value)}
              placeholder="e.g. Harkirat-dsa"
              className="w-full bg-white placeholder-gray-500 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
            <div className='w-full p-2'>
            <label className="block m-2 text-white text-xs sm:text-sm mb-2">
            Updated description
            </label>
            <input
              type="text"
              value={updatedDescription}
              onChange={(e) => setUpdatedIdDescription(e.target.value)}
              placeholder="This course will...."
              className="w-full bg-white placeholder-gray-500 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className='w-full p-2'>
            <label className="block m-2 text-white text-xs sm:text-sm mb-2">
            Updated Course Price
            </label>
            <input
              type="text"
              value={updatedPrice}
              onChange={(e) => setUpdatedIdPrice(e.target.value)}
            placeholder="e.g. ₹4999"
              className="w-full bg-white placeholder-gray-500 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
      <div className='w-full p-2'>
        <label className="block m-2 text-white text-xs sm:text-sm mb-2">
         Updated URL Course Thumbnail
        </label>
        <input
          type="text"
          value={updatedImgUrl}
          onChange={(e) => setUpdatedIdImgUrl(e.target.value)}
          placeholder="e.g. http://example.jpg"
          className="w-full bg-white placeholder-gray-500 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
          <div className='w-full px-2'>                 
            <button
             onClick={(e) => {updateCourse(course._id)}}
            className="border border-white hover:bg-white hover:text-black text-white rounded-2xl font-bold w-full mt-4 sm:mt-7 p-2 hover:cursor-pointer">Update course</button>
          </div>
        </div>
          )
        }

        
      </li>
    ))}
  </ul>
</div>
    </>
  )
}

export default CourseCard
