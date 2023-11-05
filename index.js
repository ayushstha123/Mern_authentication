import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRoute from './api/route/user_route.js';
import authRoute from './api/route/auth_route.js';
dotenv.config();
const app = express();
app.use(express.json());//allow the json as input of the backend
const PORT = 3000;
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to MONGODB");
}).catch((err)=>{
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

//error handling middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})