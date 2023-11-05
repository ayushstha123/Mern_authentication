import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";
export const signup=async (req,res,next)=>{
    const {username,password,email}= req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,password:hashedPassword,email});
    try{
    await newUser.save();
    res.status(201).json({message:"NEW USER CREATED SUCCESSFULLY"});
    }catch(err){
        next(err);
    }

}