import slugify from "slugify";
import productModel from "../Model/productModel.js";
import fs from "fs";
import e from "express";
import braintree from "braintree"
import OrderModel from "../Model/OrderModel.js";

import dotenv from "dotenv"

dotenv.config()

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "process.env.BRAINTREE_MERCHANT_ID",
    publicKey: "process.env.BRAINTREE_PUBLIC_KEY",
    privateKey: "process.env.BRAINTREE_PRIVATE_KEY",
  });

export const CreateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is required" });
            case !description:
                return res.status(400).send({ error: "Description is required" });
            case !price:
                return res.status(400).send({ error: "Price is required" });
            case !category:
                return res.status(400).send({ error: "Category is required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000: // Adjust size limit if necessary
                return res.status(400).send({ error: "Photo size should be less than 1MB" });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        });
    }
};


//get product 

export const getProductController=async(req,res)=>{
    try {
        const products=await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
        .populate('category')
        res.status(200).send({
            success:true,
            message:"all products",
            products,
            CountTotal:products.length,
        })
    } catch (error) {
        console.log(object)
        res.status(500).send({
            success:false,
            message:"error in getting product",
            error:error.message
        })
        
    }

}

//get single product 
export const singleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo") // Exclude the photo field
            .populate("category"); // Populate the category field

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
        });
    }
};

//get photo controller 
export const Productphotocontroller = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }
        
        if (product.photo && product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        } else {
            return res.status(404).send({
                success: false,
                message: "Photo not found",
            });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
        });
    }
};

//delete product
export const deleteProductController=async(req,res)=>{
try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).send({
        success: true,
        message: "product deleted successfully",
       
    });
} catch (error) {
    console.log(error)
    console.error(error);
    res.status(500).send({
        success: false,
        message: "Error while deleting product",
    });
}
}

//update product

export const updateProductController=async(req,res)=>{
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is required" });
            case !description:
                return res.status(400).send({ error: "Description is required" });
            case !price:
                return res.status(400).send({ error: "Price is required" });
            case !category:
                return res.status(400).send({ error: "Category is required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000: // Adjust size limit if necessary
                return res.status(400).send({ error: "Photo size should be less than 1MB" });
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true}
        )

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in updating product",
            error
        });
    }

}
//product filter 
export const productFiltersController=async(req,res)=>{
try {
    const {checked,radio}=req.body
    let args={}
    if(checked.length>0) args.category=checked
    if(radio.length) args.price={$gte:radio[0],$lte:radio[1]}

    const products=await productModel.find(args)
    res.status(200).send({
        success:true,
        products,
    })
} catch (error) {
    console.log(error)
    res.status(400).send({
        success:"false",
        message:"error while filtering product",
        error
    })
    
}
}

//search controller 
export const serachproductController=async(req,res)=>{
    try {
        const {keyword}=req.params

        const results=await productModel.find({
            $or:[
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }).select("-photo")
        res.json(results)
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error in searching",
            error
        })
        
    }

}

//similar product controller

export const relatedProductController=async(req,res)=>{
    try {
        const {pid,cid}=req.params
        const products=await productModel.find({
            category:cid,
            _id:{$ne:pid}
        })
        res.status(200).send({
            success:"true",
            products,
        })

        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:"false",
            message:"error while getting related product",
            error
        })
        
    }
}

//payment gateway controller

export const braintreeTokenController=async(req,res)=>{
try {
    gateway.clientToken.generate({},function(err,response){
        if(err){
            res.status(500).send(err)
        }else{
            res.send(response)
        }
    })
} catch (error) {
    console.log(error)
}
}

//payment gateway api 
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });

        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new OrderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("An unexpected error occurred.");
    }
};
