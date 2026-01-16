const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId

const UserSchema = new mongoose.Schema({
    email : String,
    password : String,
    name : String,
})


const AdminSchema = new mongoose.Schema({
    email : String,
    password : String,
    name : String,
})

const CourseSchema = new mongoose.Schema({
    title : {type: String , unique : true},
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId,
})

const PurchaseSchema = new mongoose.Schema({
    courseId : Array,
    userId : ObjectId,
})

const Usermodel  = mongoose.model('users' , UserSchema);
const Adminmodel  = mongoose.model('admins' , AdminSchema);
const Coursemodel  = mongoose.model('courses', CourseSchema);
const Purchasemodel = mongoose.model('purchase' , PurchaseSchema);

module.exports = {
    Usermodel,
    Adminmodel,
    Coursemodel,
    Purchasemodel
}
