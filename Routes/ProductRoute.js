import express from "express"
import { isAdmin, requiresigin } from "../middleware/authmiddleware.js"
import { CreateProductController, Productphotocontroller, braintreePaymentController, braintreeTokenController, deleteProductController, getProductController, productFiltersController, relatedProductController, serachproductController, singleProductController, updateProductController } from "../controller/ProductController.js"
const router =express.Router()
import formidable from "express-formidable"

//routes
router.post("/create-product",requiresigin,isAdmin,formidable(),CreateProductController)

//get-Products

router.get("/get-product",getProductController)

//single-product
router.get("/get-product/:slug",singleProductController)

//get photo
router.get("/get-photo/:pid",Productphotocontroller)

//delete product
router.delete("/product/:pid",deleteProductController)

//update product 
router.put("/update-product/:pid",requiresigin,isAdmin,formidable(),updateProductController)

//filter-Product
router.post("/product-filters",productFiltersController)

//search product

router.get('/search/:keyword' ,serachproductController)

//similar product
router.get("/related-product/:pid/:cid",relatedProductController)


//paymets route
//token
router.get("/braintree/token",braintreeTokenController)

//payments
router.post("/braintree/payments",requiresigin,braintreePaymentController)

export default router