// import mongoose from "mongoose"
// import dotenv from "dotenv"

// dotenv.config()

// const ConnDB=async()=>{
//     try {
//         const conn=await mongoose.connect(process.env.MONGO_URL)
//         console.log("connected tp database".bgGreen.white)
        
//     } catch (error) {
//         console.log(error)

//     }

// }
// export default ConnDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URL);
        console.log("Database Connected".bgGreen.white);
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};

export default connectDB;
