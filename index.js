import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = 3000;
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to MONGODB");
}).catch((err)=>{
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
