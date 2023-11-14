import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type :String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profilePic:{
        type:String,
        default:"https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png",
    }
    
},{timestamps:true});//timestamp true means two extra creation one time of creation and another is time of edit . mongo db automatically add these

const User=mongoose.model("User",userSchema);
export default User;