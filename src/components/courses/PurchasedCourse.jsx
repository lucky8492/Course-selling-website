import {React , useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PurchasedCourse() {
 const[userName , setUserName] = useState()
 const [course , setCourse] = useState([])
 const[isbuyed , setIsBuyed] = useState(false)
 const navigate = useNavigate()
 const myCourse  = [];
 const userToken = localStorage.getItem("userToken")

 
  useEffect(() => {
    async function getUserData(){
    const reponse = await axios.get("http://localhost:3000/user/user-detail" , {
     headers:{
      authorization : userToken
     }
   })
   setUserName(reponse.data.name)
    }

    async function getPurchasedCourse() {
      try{
        const reponse = await axios.get("http://localhost:3000/user/purchased-courses" , {
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


 function navigateHome(){
  navigate("/")
 }

  return(
    <div className=' bg-black '>
      <div className="bg-[#0f1729]  flex-row justify-between items-center">
        {/* start of navbar */}
     <div className=" bg-[#0f1729] p-3 ">
      <nav className="bg-[#303b4d] rounded-xl border h-fit border-gray-800/50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            
            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              <a onClick={navigateHome} className=" px-4 py-2 text-gray-400 hover:text-white font-medium">
                Home
              </a>
              <a href="#" className="px-6 py-2 text-gray-400 hover:text-white font-medium transition">
                Purchased
              </a>
              <a href="#" className="px-6 py-2 text-gray-400 hover:text-white font-medium transition">
                Profile
              </a>
              <a href="#" className="px-6 py-2 text-gray-400 hover:text-white font-medium transition">
                Help
              </a>
            </div>
          </div>

          {/* Right Side - Notifications and Profile */}
          <div className="flex items-center ">
            {/* Profile Avatar */}
            <button className=" w-20  hover:cursor-pointer transition">
              <h2 className='font-bold text-white scale-100 hover:scale-110 transition line-clamp-1'>{userName}</h2>
            </button>
          </div>
        </div>
      </nav>
    </div>
        {/* end of navbar */}
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:px-2 xl:grid-cols-3 p-2 auto-rows-fr">
          <ul role="list" className="grid gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-y-6 xl:col-span-10">
            {course.length > 0 && (
             course.map((course) => (
              <li key={course._id}>
                <div className="flex-row bg-[#303b4d] h-full items-center border-2 border-white rounded-2xl">
                  <img
                    alt=""
                    src={course.imageUrl}
                    className="h-60 w-120 p-4  rounded-3xl "
                  />
                  <div>
                    <h3 className="text-base/7 font-bold tracking-tight m-4 text-white">{course.title}</h3>
                    <p className='text-sm font-extralight p-4 line-clamp-2 text-white '>{course.description}</p>
                    <button
                    className="bg-amber-200 rounded-2xl font-bold w-[90%] mr-5 ml-5  m-2 p-2  hover:cursor-pointer">Watch lecture</button>
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
      </div>
    </div>
  )
}

export default PurchasedCourse
