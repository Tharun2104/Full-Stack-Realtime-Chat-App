import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
      profilePic: {
        type: String,
        default: "",
      },
    },
    { timestamps: true }
  );

// User is now a Mongoose model that represents the users collection in the MongoDB database.
const User = mongoose.model("User", userSchema);

// Export variable to other files
export default User;