// signup, login, logout page code
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    // res.send("signup route");
    const { fullName, email, password }= req.body;
    // create the user, hash passwords and create a token
    try {
        // check all fields are entered
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // check password length
        if(password.length<6)
        {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }

        // checking if the email is already exsist: If yes return error message
        const user = await User.findOne({email})
        if(user) return res.status(400).json({ message: "Email already exists" });

        // hash the password ( encrypt the password rather than storing it directly )
        const salt = await bcrypt.genSalt(10) 
        const hashedPasword = await bcrypt.hash(password, salt)  // 123456 => jdfsvnfddsjioi2132ends

        // Create a New User
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPasword
        })
        
        // generate tokens
        if(newUser) 
        {
            generateToken(newUser._id, res);
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message : "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in update profile:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}); // finding the user and assigning

        if(!user) { // if user not found
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) // password incorrect
        {
            return res.status(400).json({message: "Invalid credentials"})
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;  // using protectRoute get the user details

        if(!profilePic)
        {
            return res.status(400).json({ message: "Profile pic required" })
        }

        // using cloudinary upload the profile picture
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
        /*
        By default, findOneAndUpdate() returns the document as it was before update was applied. 
        If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
        */

        res.status(200).json(updateUser);
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}