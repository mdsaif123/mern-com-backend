import categoryModel from "../Model/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Check if name is provided
      if (!name) {
        return res.status(401).send({ message: "Name is required" });
      }
  
      // Check if the category already exists
      const existingCategory = await categoryModel.findOne({ name });
  
      if (existingCategory) {
        return res.status(200).send({
          success: true,
          message: "Category already exists",
        });
      }
  
      // Create a new category
      const category = await new categoryModel({
        name,
        slug: slugify(name),
      }).save();
  
      // Send success response
      return res.status(201).send({
        success: true,
        message: "New Category Created",
        category,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error in category creation",
        error,
      });
    }
  };
//update-category
export const updateCategorycontroller=async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params
        const Category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"category Updated Successfully",
            Category
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess:false,
            message:"error in category updating ",
            error
        })
        
    }
    
}

//get all category 
export const categoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"all category listed",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            messgae:"Error while getting categories",
            error
        })
        
    }

}
//single-category-controller 
export const singleCatrgoryController=async(req,res)=>{
    try {
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"get single category successfully",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting single category",
            error
        })
        
    }

}
//delete category 
export const deletecategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"deleted successfully"
        })
        
    } catch (error) {
        console.log(error)
        re.status(500).send({
            success:false,
            message:"error while deleting category",
            error
        })
        
    }

}