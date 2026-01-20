

const {Router} = require('express');
const {Purchasemodel , Usermodel ,Coursemodel ,
       bcrypt ,jwt ,z , authUser,
       USER_SECRECT_KEY , get , express } = require("../path")


const userRouter = Router();

userRouter.post("/signup" , async function(req,res){
  const validate = z.object({
    email :z.email().min(5).max(200),
    password : z.string().min(6).max(100),
    name : z.string().min(1).max(200)
  })
  
 const validateSucess = await validate.safeParse(req.body);
 
 if(!validateSucess.success){
    res.status(422).json({
        message : validateSucess.error.issues
    })
    return 
 }
  const {email ,password , name} = req.body

  
  const findUser = await Usermodel.findOne({
    email : email
  })
  if(findUser){
    res.status(412).json({
      message : "User already exists"
    })
    return
  }
  try{
    const hasedPassword =await bcrypt.hash(password ,10);
    const user = await Usermodel.create({
        email : email,
        password : hasedPassword,
        name: name
    })
    res.send("You are signedup")
  }catch(e){
   req.send("You are not signedup")
  }
 

})

userRouter.post("/signin" ,async function(req,res){
  const validateUser = z.object({
    email : z.email().min(4).max(200),
    password : z.string().min(6).max(200) 
  })
  const validateSucess = await validateUser.safeParse(req.body)
  if(!validateSucess.success){
    res.status(422).json({
        message: validateSucess.error.message
    })
    return
  }

  const {email ,password} = req.body
  
   const user = await Usermodel.findOne({
    email: email
   })

   if(!user){
    res.status(412).json({
        message : "User not found"
    })
    return
   }
   const validateLogin = await bcrypt.compare(password , user.password)
   
   if(!validateLogin){
      res.status(412).json({
        message: "Invalid password"
      })
      return
   }


   const token = jwt.sign({
       userId : user._id.toString()
   },USER_SECRECT_KEY);
   res.json({
    token: token
   })

})

userRouter.get("/user-detail" ,authUser , async function(req, res){
      const userId =  req.userId
      
      const user  = await Usermodel.findOne({
        _id : userId
      })

      if(!user){
        res.json({
          message  : "User not found"
        })
        return
      }

      res.json({
        name : user.name,
        email : user.email
      })

})

userRouter.post("/buy-Course" ,authUser , async function(req, res){
  const userId = req.userId;
  const validate  = z.object({
    courseId : z.string()
  })

  const validateSucess = validate.safeParse(req.body)

  if(!validateSucess.success){
    res.json({
      message : validateSucess.error.issues
    })
    return
  }

  const courseId = req.body.courseId;

  const findUserWithSameCourse = await Purchasemodel.findOne({
     userId : userId
  })
  
  if(findUserWithSameCourse){
    try{
      const addCourse = await  Purchasemodel.findOneAndUpdate(
        {userId : userId} , 
        {
          $addToSet :{
            courseId : courseId
          }
        }
      )
       res.json({
            message : "Successfully buyed"
          })
    }catch(e){
       res.json({
            message : "error in  finding course",
            error: e
       })
    }
  }else{
        try{
          const purchase = await Purchasemodel.create({
            courseId :  courseId,
            userId : userId
          })
          res.json({
            message : "Successfully buyed"
          })
        }catch(e){
          res.json({
            message : "Something is wrong"
          })
        }
  }



})

userRouter.get("/courses" , async function(req, res){
      try{
        const courses = await Coursemodel.find({})
          res.json({
            courses
          })
      }catch(e){
        res.json({
          error : e
        })
      }
})

userRouter.get("/purchased-courses" ,authUser, async function(req, res){
   
   const userId = req.userId;
   const getCourses = await Purchasemodel.findOne({
    userId : userId
   })

   if(!getCourses){
    res.status(422).json({
      message: "User has not buyed any courses"
    })
    return
   }
   else{
    // res.send(getCourses.courseId)
 
    const courseArr = []
    const n = getCourses.courseId.length
      for(let i = 0; i < n; i++){
         const course = await Coursemodel.findOne({
          _id : getCourses.courseId[i]
         })
         if(!course){
             await Purchasemodel.updateOne({
              userId : userId
             },{
                  $pull:{courseId : getCourses.courseId[i]}
             })
            continue;
         }else{
          courseArr[i] = course
         }

      }
      res.json({
        courseArr
      })

   }
})

module.exports = {
    userRouter : userRouter
}