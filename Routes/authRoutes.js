import express from "express"
import { registerController,logincontroller, testController, forgotPasswordController, updateProfileController } from "../controller/registerController.js"
import { isAdmin, requiresigin } from "../middleware/authmiddleware.js"

//router object
const router=express.Router()


//routing
//Register|| method post
router.post("/register", registerController)

//Login Controller || method post
router.post("/login",logincontroller)

//forgot-password
router.post("/forgot-password",forgotPasswordController)

//test route
router.get("/test",requiresigin, testController)

//protected Route

router.get("/user-auth",requiresigin,(req,res)=>{
    res.status(200).send({ok:true})
})

//admin
router.get("/admin-auth",requiresigin, isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//update profile
router.put("/profile",requiresigin,updateProfileController)

export default router

