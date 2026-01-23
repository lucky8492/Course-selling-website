import {React , useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BookCheck ,Power } from 'lucide-react'
import { useNavbar } from '../context/NavbarContext'
import NavBar from '../UI_Components/NavBar'
import { useCourseCard } from '../context/CourseCardContex'
import Footer from '../UI_Components/Footer'
const API = import.meta.env.VITE_RENDER_API

function PurchasedCourse() {
 const [course , setCourse] = useState([])
 const userToken = localStorage.getItem("userToken")
 const {setUserName , setUserToken} = useNavbar()
const {setCourses}  = useCourseCard()
 
 useEffect(() => {
    async function getUserData(){
    const reponse = await axios.get(`${API}/user/user-detail` , {
     headers:{
      authorization : userToken
     }
   })
   setUserName(reponse.data.name)
    setUserToken(userToken)

    }

    async function getPurchasedCourse() {
      try{
        const reponse = await axios.get(`${API}/user/purchased-courses` , {
         headers:{
           authorization : userToken
         }
        })
        console.log(reponse.data.courseArr)
        setCourse(reponse.data.courseArr)
      }catch(e){
       console.log("error")
      }
    }
  getPurchasedCourse()
  getUserData()
},[])



  return(
    <div className=' bg-black '>
      <div  className="bg-[radial-gradient(circle_at_center,#1a5f7a_0%,#0a1929_50%,#050a1a_100%)] h-screen flex-row justify-between items-center">
        {/* start of navbar */}

        <NavBar/>
        {/* end of navbar */}
        <div onClick={() => setIsSideBarEnabled(false)} className="mx-auto grid max-w-7xl gap-10 px-6 lg:px-2 xl:grid-cols-3 p-2 auto-rows-fr">
          <ul role="list" className="grid gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-y-6 xl:col-span-10">
            {course.length > 0 && (
             course.map((course) => (
              <li key={course._id}>
                <div className="flex-row backdrop-blur-lg h-full items-center border border-white rounded-2xl">
                  <img
                    alt=""
                    src={course.imageUrl}
                    className="h-60 w-120 p-4  rounded-3xl "
                  />
                  <div>
                    <h3 className="text-base/7 font-bold tracking-tight m-4 text-white">{course.title}</h3>
                    <p className='text-sm font-extralight p-4 line-clamp-2 text-white '>{course.description}</p>
                    <button
                    className=" border border-white rounded-2xl text-white hover:bg-white hover:text-black font-bold w-[90%] mr-5 ml-5  m-2 p-2  hover:cursor-pointer">Watch lecture</button>
                  </div>
                </div>
              </li>
            )) )  
          }
          {course.length === 0 && (

            <div className='  text-white text-6xl p-5  font-extrabold'>NO COURSE BUYED</div>
          )

          }
          </ul>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default PurchasedCourse
