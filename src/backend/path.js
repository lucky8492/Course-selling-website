
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {z} = require("zod")
// const {Router} = require("express");
const express = require("express") 
const {authAdmin , authUser} = require('./auth');
// const {userRouter} = require("./router/user")
// const {adminRouter} = require("./router/admin")
const {Adminmodel ,Usermodel, Coursemodel , Purchasemodel} = require("./db");
const { mongoose } = require("mongoose");
const { get } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId
const path = require("path")
require("dotenv").config({path: path.resolve(__dirname ,'../../.env')})// since .env file is in the  root file so using path lib to config it
const ADMIN_SECRECT_KEY = process.env.ADMIN_SECRECT_KEY
const USER_SECRECT_KEY = process.env.USER_SECRECT_KEY
const MONGODB_URL = process.env.MONGODB_URL

module.exports = {
    bcrypt,
    jwt,
    z,
    Adminmodel,
    Usermodel,
    Coursemodel,
    Purchasemodel,
    // Router,
    // userRouter,
    // adminRouter,
    authAdmin,
    authUser,
    mongoose,
    ObjectId,
    express ,
    get,
    ADMIN_SECRECT_KEY,
    USER_SECRECT_KEY,
    MONGODB_URL
}
