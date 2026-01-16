
const {Router} = require("express");

const {Adminmodel , Usermodel ,Coursemodel  ,bcrypt ,jwt ,z , authAdmin,
         ObjectId ,ADMIN_SECRECT_KEY, mongoose} = require("../path")

const adminRouter = Router();

adminRouter.post("/signup" , async function(req,res){
   const validate = z.object({
    email : z.email().min(5).max(200),
    password : z.string().min(6).max(100),
    name : z.string().min(3).max(200)
   })

   const validateSucess = await validate.safeParse(req.body);
   if(!validateSucess.success){
    res.status(422).json({
      message: validateSucess.error.issues
    })
     return
   }

  //  const email = req.body.email;
  //  const password = req.body.password;
  //  const name = req.body.name;

  const {email , password , name } = req.body
  
    const findAdminAsUser = await Usermodel.findOne({
      email : email
    })
    if(findAdminAsUser){
      res.json({
        message : "User cannot signup as Admin"
      })
    }


   const admin = await Adminmodel.findOne({
    email : email
   })

    if(admin){
      res.json({
        message: "Admin already exists"
      })
      return
    } 

   try{ 
    const hasedPassword = await bcrypt.hash(password , 10);
      const admin = await Adminmodel.create({
        email : email,
        password : hasedPassword,
        name : name
      })
      res.json({
        message : name + " you are signed up"
      })
  }
   catch(e){
      res.json({
        message : "Something went wrong"
      })
      return
   }
       
  })

adminRouter.post("/signin" , async function(req,res){
    const validate = z.object({
    email : z.email().min(5).max(200),
    password : z.string().min(6).max(100),
   })

   const validateSucess = await validate.safeParse(req.body)

    if(!validateSucess.success){
      res.status(422).json({
        message : validateSucess.error.issues
      })
      return
    }

    const  { email , password } = req.body
   

    const findAdmin = await Adminmodel.findOne({
      email : email
    })
    if(!findAdmin){
      res.json({
        message : "email not found"
      })
      return 
    }

    
   
      const validateLogin = await bcrypt.compare(password  , findAdmin.password);
     
      if(!validateLogin){
        res.status(412).json({
          message : "Invalid password"
        })
        return;
      }

      const token = jwt.sign({
        creatorId : findAdmin._id.toString()
      }, ADMIN_SECRECT_KEY);

      res.json({
        token : token
      })

})
adminRouter.get("/admin-detail" , authAdmin , async function(req, res){
   const creatorId = req.creatorId;

   const adminDetail = await Adminmodel.findOne({
      _id : creatorId
   })

   if(!adminDetail){
    res.json({
      message : "Admin not found"
    })
    return
   }

   res.json({
    name : adminDetail.name,
    email : adminDetail.email
   })
  
})
adminRouter.post("/add-course" ,authAdmin ,  async function(req, res){
 
  const creatorId = req.creatorId;
  
  const validate  = z.object({
    title : z.string().min(5).max(100),
    description: z.string().min(4).max(400),
    price : z.number(), 
    imageUrl : z.string().url()
  })

  const validateSucess = await validate.safeParse(req.body);
  if(!validateSucess.success){
    res.status(422).json({
      message : validateSucess.error.issues
    })
    return
  }

  const {title , imageUrl , description , price} = req.body

  try{
    const addCourse = await Coursemodel.create({
      title : title,
      description : description,
      price : price,
      imageUrl : imageUrl,
      creatorId :creatorId
    })
    res.json({
      message: "Course has been added"
    }) 
  }catch(e){
    res.status(412).json({
      message : "Course already added"
    })
  }

})
adminRouter.get("/getAdminCourse" ,authAdmin , async function(req, res){
  const creatorId = req.creatorId;
     const courseId = req.query.courseId;
    console.log(courseId)
   const creator = await Coursemodel.findOne({
    _id:courseId
   })
   console.log(creator)
   const creatorName = await Adminmodel.findOne({
    _id : creator.creatorId
   })
    console.log("hi3")
   res.json({
    name : creatorName.name
   })
   

})
adminRouter.put("/update-course" , authAdmin , async function(req, res){

  const creatorId = req.creatorId;

  const validate  = z.object({
    updatedTitle : z.string().min(5).max(100),
    updatedDescription : z.string().min(4).max(400),
    updatedPrice : z.number(),
    updatedImgUrl : z.string()
  })
    const validateSucess = await validate.safeParse(req.body);
  if(!validateSucess.success){
    res.json({
      message : validateSucess.error.issues
    })
    return
  }
   const {courseId,updatedPrice , updatedDescription , updatedImgUrl ,updatedTitle } = req.body
 
   const filter = {_id: new ObjectId(courseId) ,
                   creatorId:creatorId
                   } // always use new keyword while serching in db 
   const update = {title : updatedTitle,
                    description: updatedDescription,
                    price : updatedPrice,
                    imageUrl : updatedImgUrl,
                   };

  try{
   const updateCourse  = await Coursemodel.findOneAndUpdate(filter , update , {new:true})
    if(updateCourse){
      res.json({
       message : "Info has been  updated into"
      })
    }else{
      res.json({
        message : "YOU can only update Your courses",
      })
    }
  }catch(e){
    res.json({
      message : "something went wrong",
      error :e
    })
  }
})

adminRouter.post("/courses" , async function(req, res){
  
  try{
    const  courses = await Coursemodel.find({})
    res.json({
      courses
    })
    }catch(e){
      res.json({
        error : e
      })
    }
})

adminRouter.delete("/remove-course" ,authAdmin, async function(req,res){
   
  const creatorId = req.creatorId
  const courseId = req.query.courseId;
  
   const validAdmin = await Coursemodel.findOne({
    _id : courseId,
    courseId : courseId     
   })
   
   if(!validAdmin){
    res.json({
      message : "You Cannot delete other's course"
    })
   }
   const wasDeleted = await Coursemodel.deleteOne({
    _id :courseId
   })

   if(!wasDeleted){
    res.json({
      message: "Course was not deleted"
    })
    return
   }

   res.json({
    message :"Your Course Deleted successfully"
   })

})

module.exports  = {
    adminRouter : adminRouter
}
