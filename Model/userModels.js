// import { Timestamp } from "mongodb"
// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     phone: {
//       type: String,
//       required: true
//     },
//     answer:{
//      type:String,
    
//     },
//     address: {
//       type: String,


//     },
//     role: {
//       type:Number,
//       default:0


//     }
//   },{timestamps:true});
  

// const users=mongoose.model("users",userSchema)

// export default users


import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
       type:String,
       unique:true,
       required:true
    },
    phone:{
        type:String,
        required:true

    },
    address:{
        type:String,
        
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:Number,
        default:0
    }


},{timestamps:true})

const users=mongoose.model("users",UserSchema)

export default users