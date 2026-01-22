import { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useNavbar } from '../context/NavbarContext'
import NavBar from '../UI_Components/NavBar'
const API = import.meta.env.VITE_RENDER_API


function CreateCourse() { 
   const[courseTitle , setCourseTitle] = useState("")
   const[courseDescription , setCourseDescription] = useState("")
   const[coursePrice , setCoursePrice] = useState("")
   const[courseThunbnail , setCourseThumbnail] = useState("")
   const[message , setMessage] = useState();
   const[color , setColor] = useState(false);
   const navigate = useNavigate()
   const { setAdminToken , setUserName} = useNavbar()
   
   const myCourse  = [];
   const adminToken = localStorage.getItem("adminToken")
   setAdminToken(adminToken)
    useEffect(() => {
    async function getUserData(){
      const reponse = await axios.get(`${API}/admin/admin-detail` , {
       headers:{
        authorization : adminToken
       }
     })
     console.log(reponse.data.email)
     setUserName(reponse.data.name)
    }
    getUserData()
  },[])
  
  
  async function addCourse(){
    try{
      const response = await axios.post(`${API}/admin/add-course` , {
        "title" : courseTitle,
        "description": courseDescription,
        "price" : parseInt(coursePrice),
        "imageUrl": courseThunbnail
      } ,{
        headers:{
          authorization :adminToken
        }
      })
      setColor(true)
      // console.log(response.data.message)
      setMessage(response.data.message)
      navigate("/")
    }catch(e){
      setColor(false)
      if(e.response.status === 422){
          console.log(e.response.data)
          setMessage("Invalid: "+e.response.data.message[0].path[0]);
        }else{
          setMessage(e.response.data.message)
        }
    }
  }
  
  return(
    <div className=" bg-[radial-gradient(circle_at_center,#1a5f7a_0%,#0a1929_50%,#050a1a_100%)] ">
      <div className="">
        <NavBar/>
        <div className="backdrop-blur-lg border mt-5 shadow-2xl border-white md:w-[50%] md:mr-25 md:ml-75 rounded-2xl p-8 md:p-12">

          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">
            Add Course
          </h1>


          {/* Form Fields */}
          <div className="w-full">
            <div className="">

              {/* course title */}
              <div className='p-2'>
                <label className="block m-2 text-white text-sm mb-2">
                 Course title
                </label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. Harkirat-dsa"
                  className="w-full border-white border text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              {/* description of course*/}
              <div className='p-2'>
                <label className="block  text-white text-sm mb-2">
                Description about the course
                </label>
                <input
                  type="text"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="this course will...."
                  className="w-full border-white border text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
              
              {/* Price  */}
               <div className='p-2'>
                <label className="block text-white text-sm mb-2">
                  Price of the course
                </label>
                <input
                  type="text"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}                  
                  placeholder="e.g. ₹4999"
                  className="w-full border-white border text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              {/* Course url */}
               <div className='p-2'>
                <label className="block text-white text-sm mb-2">
                 URL of course thumbnail
                </label>
                <input
                  type="text"
                  value={courseThunbnail}
                  onChange={(e) => setCourseThumbnail(e.target.value)}                  
                  placeholder="e.g. http://example.jpg"
                  className="w-full border-white border text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

 

            {/* Submit Button */}
            <button
              type="button"
              onClick={addCourse}
              className="w-full border border-white hover:text-black hover:bg-white font-mono hover:cursor-pointer text-white font-medium rounded-lg px-4 py-3 mt-9 transition"
            >
              Add course +
            </button>
              <p className={!color ? `text-red-400 p-2` : `text-green-400 p-2`}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse
