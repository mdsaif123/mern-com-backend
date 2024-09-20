import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import ConnDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import cors from "cors"
import categoryRoute from "./Routes/CategoryRoute.js"
import productRoute from "./Routes/ProductRoute.js"

dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors())

// Connection to database
ConnDB();

// Routes
app.use('/', authRoutes);
app.use("/", categoryRoute)
app.use('/', productRoute)

// Basic API endpoint
app.get("/", (req, res) => {
    res.send("hello world");
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`.cyan.bold);
});
