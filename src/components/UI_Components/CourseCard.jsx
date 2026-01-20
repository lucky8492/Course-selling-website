import React, { useEffect, useState } from 'react'
import { useCourseCard } from '../context/CourseCardContex'
import axios from 'axios'

function CourseCard() {
  const {course ,setCourses, userTokens , adminTokens} = useCourseCard()
  const [updatedId , setUpdatedId] = useState("")
  const [updatedTitle , setUpdatedIdTitle] = useState("");
  const [updatedPrice , setUpdatedIdPrice] = useState("");
  const [updatedImgUrl , setUpdatedIdImgUrl] = useState("");
  const [updatedDescription , setUpdatedIdDescription] = useState("");
 

useEffect(()=>{
    async function getCourse() {
     const reponse = await axios.get("http://localhost:3000/user/courses")
    //  console.log(reponse.data.courses)
     setCourses(reponse.data.courses)
  }
  getCourse()
},[userTokens , adminTokens , updatedId])


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

async function deleteCourse(courseId){
   const response = await axios.delete("http://localhost:3000/admin/remove-course" ,{
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
 
  const reponse = await axios.put("http://localhost:3000/admin/update-course" , 
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
  console.log(reponse.data)
  alert(reponse.data.message)
  setUpdatedId("")
   setUpdatedIdTitle("")
   setUpdatedIdDescription("")
   setUpdatedIdImgUrl("")
   setUpdatedIdPrice("")
}

  return (
    <>
    
        <div className="mx-auto z-0 flex-1 grid max-w-7xl gap-10 px-6 lg:px-2 xl:grid-cols-3 p-2 auto-rows-fr">
          <ul role="list" className="grid gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-y-6 xl:col-span-10">
            {course.map((course) => (
              <li key={course._id}>
                {
                  updatedId != course._id && (
                <div  className="flex-row  backdrop-blur-3xl h-full items-center border border-white  rounded-2xl">
                  <img
                    alt=""
                    src={course.imageUrl}
                    className="h-60 w-120 p-4 z-0 rounded-3xl "
                  />
                 { !adminTokens &&(
                   <div className='text-white'>
                   <h3 className="text-base/7 font-bold tracking-tight m-4 ">{course.title}</h3>
                   <p className='text-sm font-extralight p-4 line-clamp-2  '>{course.description}</p>
                   <p className='text-xl font-bold p-4 '>₹ {course.price} </p>
                   <button
                    onClick={(e) => {buyNow(course._id);}}
                   className=" border border-white text-white hover:bg-white hover:text-black rounded-2xl font-bold w-[90%] mr-5 ml-5  m-2 p-2 mb-3  hover:cursor-pointer">Buy Now</button>
                 </div>
                )}
                {adminTokens && (
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
                )
                }
                </div>
                  )
                }

                {
                  updatedId === course._id && (
                 <div  className="flex-row bg-[#303b4d] h-full items-center border border-white rounded-2xl">
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
         </div>
    </>
  )
}

export default CourseCard
