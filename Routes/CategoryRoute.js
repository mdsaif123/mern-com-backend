import express from "express"
import { isAdmin, requiresigin } from "../middleware/authmiddleware.js"
import { categoryController, createCategoryController, deletecategoryController, singleCatrgoryController, updateCategorycontroller } from "../controller/categoryController.js"
const router=express.Router()

//routes
//create-category
router.post("/create-category", requiresigin, isAdmin,createCategoryController)

////update-category
router.put('/update-category/:id',requiresigin,isAdmin,updateCategorycontroller)

//get-all category
router.get("/get-category",categoryController)

//single-category
router.get("/single-category" ,singleCatrgoryController)

//delete-category
router.delete("/delete-category/:id",requiresigin,isAdmin, deletecategoryController)

export default router