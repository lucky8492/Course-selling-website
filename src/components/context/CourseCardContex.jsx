import {React , useContext ,createContext ,useEffect, useState} from 'react'

const CourseCardContext = createContext()

export const CourseCardProvider = ({children})=>{
     const [course , setCourses] = useState([])
     const [userTokens , setUserTokens] = useState("")
     const [adminTokens , setAdminTokens] = useState("")
  return(
    <CourseCardContext.Provider value={{course , setCourses , userTokens ,adminTokens , setAdminTokens, setUserTokens}}>
      {children}
    </CourseCardContext.Provider>
  )
}

export  const useCourseCard = () => useContext(CourseCardContext)