import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next) => {
try {
    // grab the token and check if there is any token is there
    const token = req.cookies.jwt;
    if(!token) {
        return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    // decode the token for userId 
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(!decoded) {
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    // from userId extract the user details ( email and fullName not password )
    const user = await User.findById(decoded.userId).select("-password");
    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next(); // calling the update profile pic function

} catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
}
};
