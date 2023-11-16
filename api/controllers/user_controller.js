import { errorHandling } from "../../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user_model.js";
export const test=(req,res)=>{
    res.json({message:"User Api is working"});

}

//update user
export const updateUser=async(req,res,next)=>{
if(req.user.id !==req.params.id){
    return next(errorHandling(403,"You can update only your account!"))
}
try{
    if(req.body.password){
        req.body.password=bcryptjs.hashSync(req.body.password,10);

    }
    const updatedUser=await User.findByIdAndUpdate(req.params.id ,
        {
    $set:{
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    profilePic:req.body.profilePic
    }
    },{new:true}
    )
    const {password,...rest}=updatedUser._doc;
    res.status(200).json(rest);
}catch(err){
    next(err);
}
}
