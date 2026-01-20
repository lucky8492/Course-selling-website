const jwt = require("jsonwebtoken")
const path =  require("path")
require("dotenv").config({path: path.resolve(__dirname ,'../../.env')})// since .env file is in the  root file so using path lib to config it
const ADMIN_SECRECT_KEY = process.env.ADMIN_SECRECT_KEY
const USER_SECRECT_KEY = process.env.USER_SECRECT_KEY

async function authUser(req, res, next){
    const token = req.headers.authorization
    const checkToken = jwt.verify(token , USER_SECRECT_KEY)
    
    if(checkToken){
        req.userId = checkToken.userId
        next()
    }else{
        res.send("Invalid user");
    }
}


 function authAdmin(req , res, next){
  const token = req.headers.authorization;
 
  const validToken = jwt.verify(token , ADMIN_SECRECT_KEY);

  if(validToken){
    req.creatorId = validToken.creatorId;
    next();

  }else{
    res.send("Invalid admin")
  }
}


module.exports = {
    authUser,
    authAdmin
}
