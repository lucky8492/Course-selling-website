import { useState ,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter , Routes , Route } from 'react-router-dom' 
import UserSignin from './components/users/UserSignin'
import UserSignup from './components/users/UserSignup'
import AdminSignin from './components/admin/AdminSignin'
import AdminSignup from './components/admin/AdminSignup'
import Courses from './components/courses/Courses'
import CreateCourse from './components/courses/CreateCourse'
import PurchasedCourse from './components/courses/PurchasedCourse'
import { NavBarProvider } from './components/context/NavbarContext'
import { CourseCardProvider } from './components/context/CourseCardContex'
function App() { 


  return(
    <>
    <BrowserRouter>
     <Routes>
     
      <Route path='/' element={
        <CourseCardProvider>
        <NavBarProvider>
          <Courses/>
        </NavBarProvider>
        </CourseCardProvider>
        }/>
  
      <Route path='/userSignin' element={<UserSignin/>}/>
      <Route path='/userSignup' element={<UserSignup/>}/>      
      <Route path='/adminSignup' element={<AdminSignup/>}/>      
      <Route path='/adminSignin' element={<AdminSignin/>}/> 
      <Route path='/admin/addcourse' element ={<CreateCourse/>}/>
      <Route path='/user/purchase' element={
        <NavBarProvider>
          <PurchasedCourse/>
        </NavBarProvider>
        }/>    
     </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
