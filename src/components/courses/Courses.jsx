import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {  useNavbar } from '../context/NavbarContext';
import NavBar from '../UI_Components/NavBar';
import { useCourseCard } from '../context/CourseCardContex';
import CourseCard from '../UI_Components/CourseCard';
function Courses() {
 const [updatedId , setUpdatedId] = useState("")
 const userToken = localStorage.getItem("userToken")
 const adminToken = localStorage.getItem("adminToken")
 const navigate = useNavigate()
 const {setUserToken, setAdminToken , setUserName} = useNavbar()
 const {setCourses , setUserTokens , setAdminTokens} = useCourseCard()
  useEffect(() => {
  if(!userToken && !adminToken){
 
 }else if(userToken && !adminToken){
    async function getUserData(){
    const reponse = await axios.get("http://localhost:3000/user/user-detail" , {
     headers:{
      authorization : userToken
     }
   })
   
   //1
   setUserName(reponse.data.name)
   setUserToken(userToken)
   setUserTokens(userToken)
   setAdminTokens("")
   setAdminToken("")
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
   setUserName(reponse.data.name
   )
   setAdminToken(adminToken)
   setAdminTokens(adminToken)
   setUserTokens("")
   setUserToken("")
   }
   getAdminData()
 }

  async function getCourse() {
     const reponse = await axios.get("http://localhost:3000/user/courses")
    //  console.log(reponse.data.courses)
   
     setCourses(reponse.data.courses)
  }
  getCourse()


},[userToken , adminToken , updatedId , ])


  return (
    <>
    <div className=' bg-black'>
      <div className="bg-[radial-gradient(circle_at_center,#1a5f7a_0%,#0a1929_50%,#050a1a_100%)]  text-black ">

        {/* start of navbar */}
        <NavBar/>
        {/* end of navbar */}
       <CourseCard/>
      </div>
    </div>

    </>
  )
}

export default Courses
