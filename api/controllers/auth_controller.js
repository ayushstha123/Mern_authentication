import User from "../models/user_model.js";
import { errorHandling } from "../../utils/error.js";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    try {
        await newUser.save();
        res.status(201).json({ message: "NEW USER CREATED SUCCESSFULLY" });
    } catch (err) {
        next(err);
    }

}


export const signin = async (req, res, next) => { // (err,req, res, next) The err parameter in an Express route handler function is typically used to handle errors that occur during the execution of the middleware or route handler. It's a convention to pass errors to the next function if an error occurs.
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandling(404, 'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandling(401, "wrong password"))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        /* 
        const { a, ...rest } = { a: 1, b: 2, c: 3 };
        console.log(a); // 1
        console.log(rest); // { b: 2, c: 3 }
        */
       const expiryDate=new Date(Date.now())+3600000;
        res.cookie('access_token', token, { httpOnly: true ,expiryDate}).status(200).json(rest);
    } catch (err) {
        next(err);
    }
}

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res.cookie('access_token', token, { httpOnly: true, expiryDate }).status(200).json(rest);
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePic: req.body.photo,
        });
  
        await newUser.save();
  
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: newUserHashedPassword, ...newUserRest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res.cookie('access_token', token, { httpOnly: true, expiryDate }).status(200).json(newUserRest);
      }
    } catch (err) {
      // Handle errors properly and send a meaningful response
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal Server Error', statusCode: 500 });
    }
  };