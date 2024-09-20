// import jwt from "jsonwebtoken"
// import userModels from "../Model/userModels.js"

// //protected route
// export const requiresigin=async(req,res,next)=>{
//     try {
//         const decode=jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
//         req.user=decode
//         next()
        
//     } catch (error) {
//         console.log(error)
        
//     }

// }

// // //isadmin access

// // export const isAdmin=async(req,res,next)=>{
// //     try {
// //         const user=await userModels.findById(req.user._id)
// //         if(user.role !==1){
// //             return res.status(401).send({
// //                 success:false,
// //                 message:"Unauthirized Access"
// //             })
// //         }
       
// //         else{
// //             next()
// //         }
        
// //     } catch (error) {
// //         console.log(error)

        
// //     }
// // }

// // admin access
// export const isAdmin = async (req, res, next) => {
//     try {
//         const user = await userModels.findById(req.checkuser._id);
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "User not found",
//             });
//         }
//         if (user.role !== 0) {
//             return res.status(403).send({
//                 success: false,
//                 message: "Unauthorized access",
//             });
//         }
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Server error",
//         });
//     }
// };


import jwt from "jsonwebtoken";
import userModels from "../Model/userModels.js";

// Protected route middleware
export const requiresigin = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log("Error in requiresigin middleware:", error);
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

// Admin access middleware
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModels.findById(req.user._id); // Use req.user here
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        if (user.role !== 1) { // Assuming role '1' is for admin
            return res.status(403).send({
                success: false,
                message: "Unauthorized access",
            });
        }
        next();
    } catch (error) {
        console.log("Error in isAdmin middleware:", error);
        return res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
};
